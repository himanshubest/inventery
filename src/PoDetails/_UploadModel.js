import { React, useState } from "react";
import { toast } from "react-toastify";
import { getBody } from "../api/common";
import { Seriol_NumberUpload } from "../api/apicall";
import auth from "../api/auth";
import {  UploadOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Form, Upload,Spin } from "antd";
import "antd/dist/antd";
import "./CustomTable.css";

export default function _UploadModel({ selectedUploadItem, isModalUploadVisible, uploadForm, uploadModelCancel, fillPoList ,userData}) {
    const [loading, setLoading] = useState(false);
    const handleUploadOk = ()=>{
        uploadForm
        .validateFields()
        .then((values) => {
            handleUploadSubmit(values);
        })
        .catch((errorInfo) => {
            console.log("Validation Failed:", errorInfo);
        });
    }
    const handleUploadSubmit =(values)=>{
        setLoading(true);
        const formDa = new FormData();
        formDa.append("PoDetailId", values.poDetailId);
        formDa.append("PoItemDetilId", values.poItemDetilId);
        formDa.append("LoginUserId", userData.inventoryUserId);
        formDa.append("BulkImportDocument", values.bulkImportDocument.file.originFileObj);
        Seriol_NumberUpload((new auth).getApiKey(), formDa, (err, res) => {
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
                setLoading(false);
                fillPoList();
                uploadModelCancel();
            }
            else
            {
                toast.error(response.status.message);
                setLoading(false);
            }
        });
    }
  return (
    <>
    {
        loading ? (<Spin size="large" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }} />) :( <Modal
            title="Upload Seriol Number"
            visible={isModalUploadVisible}
            onOk={handleUploadOk}
            onCancel={uploadModelCancel}
            afterClose={() => uploadForm.resetFields()} // Reset form fields when the modal closes
        >
            {selectedUploadItem && (
                <Form
                    form={uploadForm}
                    layout="vertical"
                    onFinish={handleUploadSubmit} // Handle the form submission
                    initialValues={{
                        poDetailId: selectedUploadItem.poDetailId,
                        poItemDetilId: selectedUploadItem.poItemDetilId,
        
                    }}
                >
                    <Form.Item name="poDetailId" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item name="poItemDetilId" hidden>
                        <Input />
                    </Form.Item>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <Form.Item
                                label="Upload Serial Number"
                                name="bulkImportDocument"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select a receiving date",
                                    },
                                ]}
                            >
                                <Upload
                                    beforeUpload={(file) => {
                                        const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel';
                                        if (!isExcel) {
                                            toast.error('You can only upload Excel files!');
                                        }
                                        return isExcel || Upload.LIST_IGNORE; // Prevent upload if not Excel
                                    }}
                                >
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                            </Form.Item>
        
                        </div>
        
        
                    </div>
                </Form>
            )}
        </Modal>)
    }
    </>
   
  )
}
