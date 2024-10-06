import { React, useState } from "react";
import { toast } from "react-toastify";
import { getBody } from "../api/common";
import { Stock_RecivingWithoutSN } from "../api/apicall";
import auth from "../api/auth";
import { Modal, Form, Input, DatePicker,Spin } from "antd";
import "antd/dist/antd";
import "./CustomTable.css";

export default function RecivingModel({ selectedItem, isModalVisible, form, handleCancel, fillPoList ,userData}) {
    const [loading, setLoading] = useState(false);
    //const userData = new auth().getUserData(); // Assuming you're getting user data from auth

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                handleFormSubmit(values);
            })
            .catch((errorInfo) => {
                console.log("Validation Failed:", errorInfo);
            });
    };

    const handleFormSubmit = (values) => {
        setLoading(true);
        const payload = {
            poDetailId: values.poDetailId,
            poItemDetilId: values.poItemDetilId,
            recivingQuantity: values.receiveQuantity,
            receivingDate: values.receivingDate.format("YYYY-MM-DD"),
            loginUserId: userData.inventoryUserId,
        };

        Stock_RecivingWithoutSN(new auth().getApiKey(), payload, (err, res) => {
            if (err) {
                toast.error("Could not connect to the internet " + err.message);
                setLoading(false);
                return;
            }

            let response = getBody(res);
            if (response.status.isSuccess) {
                toast.success("Data Upload Successfully", {
                    autoClose: 3000, // 3 seconds
                });
                fillPoList();
                handleCancel();
                setLoading(false);
            } else {
                toast.error(response.status.message);
                setLoading(false);
            }
        });
    };

    return (

        <>
        {
             loading ? (<Spin size="large" style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }} />) :( <Modal
                title="Receiving Item Details"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={loading}
                afterClose={() => form.resetFields()} // Reset form fields when the modal closes
            >
                {selectedItem && (
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{
                            poDetailId: selectedItem.poDetailId,
                            poItemDetilId: selectedItem.poItemDetilId,
                            receiveQuantity: selectedItem.receiveQuantity || 0, // Initialize with default value
                            receivingDate: selectedItem.receivingDate ? selectedItem.receivingDate : null,
                        }}
                    >
                        <Form.Item name="poDetailId" hidden>
                            <Input />
                        </Form.Item>
                        <Form.Item name="poItemDetilId" hidden>
                            <Input />
                        </Form.Item>
    
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <Form.Item
                                    label="Receive Quantity"
                                    name="receiveQuantity"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter receive quantity",
                                        },
                                        {
                                            validator: (_, value) => {
                                                if (!value || value <= selectedItem.quantity - selectedItem.itemRecivingQuantity) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error("Value must not be greater than Remaining Qty"));
                                            },
                                        },
                                    ]}
                                >
                                    <Input type="number" placeholder="Enter Received quantity" />
                                </Form.Item>
                            </div>
    
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <Form.Item
                                    label="Receiving Date"
                                    name="receivingDate"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select a receiving date",
                                        },
                                    ]}
                                >
                                    <DatePicker style={{ width: "100%" }} placeholder="Select receiving date" />
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                )}
            </Modal>)
        }
        </>
       
    );
}
