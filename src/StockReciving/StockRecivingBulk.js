import { React, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getBody } from '../api/common';
import { Form, Input, Button, Select, DatePicker, Upload, message, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import auth from '../api/auth';
import { Po_NameList, Item_NameList, Item_QtyList,Stock_RecivingBulk } from '../api/apicall';
const { Option } = Select;

const StockRecivingBulk = () => {
    const [form] = Form.useForm();
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [remainingQuantity, setRemainingQuantity] = useState(0);
    const [selectedPoNumber, setSelectedPoNumber] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);
    const [loading, setLoading] = useState(false);
    const[userData,setUserData]  = useState((new auth).getUser());

    useEffect(() => {
        setLoading(true); // Start loading before the API call
        Po_NameList((new auth).getApiKey(), (err, res) => {
            if (err) {
                toast.error("Could not connect to the internet " + err.message);
                setLoading(false);
                return;
            }

            let response = getBody(res);
            if (response.status.isSuccess) {
                setSelectedPoNumber(response.data);
                (new auth).setApiKey(res.headers['x-unique-key'], (new auth).getToken());
                setLoading(false);
            } else {
                toast.error(response.status.message);
                setLoading(false);
            }
        });
    }, []);

    const handlePoNumberChange = (value) => {
        setLoading(true);
        setSelectedItem([]);
        setTotalQuantity(0);
        setRemainingQuantity(0);
        form.setFieldsValue({
            quantity: 0,
            remainingQuantity: 0,
            poItemDetilId:[]
        });
        
        Item_NameList((new auth).getApiKey(), value, (err, res) => {
            if (err) {
                toast.error("Could not connect to the internet " + err.message);
                setLoading(false);
                return;
            }

            let response = getBody(res);
            if (response.status.isSuccess) {
                setSelectedItem(response.data);
                (new auth).setApiKey(res.headers['x-unique-key'], (new auth).getToken());
                setLoading(false);
            } else {
                toast.error(response.status.message);
                setLoading(false);
            }
        });
    };

    const handleItemChange = (value) => {
        
        setTotalQuantity(0);
        setRemainingQuantity(0);
        form.setFieldsValue({
            quantity: 0,
            remainingQuantity: 0,
            
        });
        setLoading(true);
        Item_QtyList((new auth).getApiKey(), value, (err, res) => {
            if (err) {
                toast.error("Could not connect to the internet " + err.message);
                setLoading(false);
                return;
            }

            let response = getBody(res);
            if (response.status.isSuccess) {
                // Update state
                const qty = response.data.quantity;
                const remainingQty = response.data.remainingQuantity;

                // Set quantities to state
                setTotalQuantity(qty||0);
                setRemainingQuantity(remainingQty||0);

                // Update the form fields
                form.setFieldsValue({
                    quantity: qty,
                    remainingQuantity: remainingQty,
                });

                (new auth).setApiKey(res.headers['x-unique-key'], (new auth).getToken());
                setLoading(false);
            } else {
                toast.error(response.status.message);
                setLoading(false);
            }
        });
    };

    const handleFormSubmit = (values) => {
      

        const formDa = new FormData();
        formDa.append("PoDetailId", values.poDetailId);
        formDa.append("PoItemDetilId", values.poItemDetilId);
        formDa.append("Quantity", values.quantity);
        formDa.append("RemainingQuantity", values.remainingQuantity);
        formDa.append("ReceivingDate", values.receivingDate.format("YYYY-MM-DD"));
        formDa.append("BulkImportDocument", values.bulkImportDocument.file.originFileObj);

        Stock_RecivingBulk((new auth).getApiKey(), formDa, (err, res) => {
            if (err) {
                toast.error("Could not connect to the internet " + err.message);
                setLoading(false);
                return;
            }

            let response = getBody(res);
            if (response.status.isSuccess) {
                toast.success('Data Upload Successfully', {

                    autoClose: 3000, // 3 seconds
                });
            }
            else
            {
                toast.error(response.status.message);
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
                }} />) : <div className="page-wrapper">
                    <div className="content container-fluid">
                        <div className="card mb-0">
                            <div className="card-body">
                                <div className="page-header">
                                    <h5>Stock Bulk Receive </h5>
                                </div>
                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={handleFormSubmit}
                                >
                                    <div className="row">
                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <Form.Item
                                                label="Po Number"
                                                name="poDetailId"
                                                rules={[{ required: true, message: "Please select PO number" }]}
                                            >
                                                <Select allowClear showSearch placeholder="Select Po"
                                                    onChange={handlePoNumberChange}
                                                    filterOption={(input, option) =>
                                                        option.children.toLowerCase().includes(input.toLowerCase())
                                                    }>
                                                    {selectedPoNumber.map((item, index) => (
                                                        <Select.Option key={index} value={item.value}>{item.text}</Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </div>

                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <Form.Item
                                                label="Select Item"
                                                name="poItemDetilId"
                                                rules={[{ required: true, message: "Please select an item" }]}
                                            >
                                                <Select allowClear showSearch placeholder="Select Item"
                                                    onChange={handleItemChange}
                                                    filterOption={(input, option) =>
                                                        option.children.toLowerCase().includes(input.toLowerCase())
                                                    }>
                                                    {selectedItem.map((item, index) => (
                                                        <Select.Option key={index} value={item.poItemDetilId}>{item.text}</Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </div>

                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <Form.Item label="Total Quantity" name="quantity">
                                                <Input
                                                    placeholder="Total Quantity"
                                                    disabled
                                                    value={totalQuantity}
                                                />
                                            </Form.Item>
                                        </div>

                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <Form.Item label="Remaining Quantity" name="remainingQuantity">
                                                <Input
                                                    placeholder="Remaining Quantity"
                                                    readOnly
                                                    value={remainingQuantity} // Ensure to bind this value to state
                                                />
                                            </Form.Item>
                                        </div>

                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <Form.Item
                                                label="Receiving Date"
                                                name="receivingDate"
                                                rules={[{ required: true, message: "Please select date" }]}
                                            >
                                                <DatePicker
                                                    style={{ width: "100%" }}
                                                    placeholder="Select Receiving Date"
                                                />
                                            </Form.Item>
                                        </div>

                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <Form.Item label="Upload Serial Number" name="bulkImportDocument">
                                                <Upload>
                                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                                </Upload>
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <Button type="primary" htmlType="submit" className="me-2">
                                                Save & Send
                                            </Button>
                                            <Button type="default" htmlType="reset">
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default StockRecivingBulk;
