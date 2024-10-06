import { React, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getBody } from "../api/common";
import { Po_List } from "../api/apicall";
import auth from "../api/auth";

import { Button, Table, Spin, Form } from "antd";
import "antd/dist/antd";
import "./CustomTable.css";
import RecivingModel from "./RecivingModel";
import _UploadModel from "./_UploadModel";
import _ColumnsComponent from "./_ColumnsComponent";

export default function ListPo() {
    const [form] = Form.useForm();
    const [uploadForm] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalUploadVisible, setIsModalUploadVisible] = useState(false);
    const [selectedUploadItem, setSelectedUploadItem] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [PoList, setPoList] = useState([]);
    const [userData, setUserData] = useState(new auth().getUser());

    useEffect(() => {
        setLoading(true);
        fillPoList();
       // setLoading(false);
    }, []);

    const fillPoList = () => {
        Po_List(new auth().getApiKey(), (err, res) => {
            setLoading(true);
            if (err) {
                toast.error("Could not connect to the internet " + err.message);
                setLoading(false);
                return;
            }

            let response = getBody(res);
            if (response.status.isSuccess) {
                setPoList(response.data);
                new auth().setApiKey(
                    res.headers["x-unique-key"],
                    new auth().getToken()
                );
                setLoading(false);
            } else {
                toast.error(response.status.message);
                setLoading(false);
                return;
            }
        });
    };
    // Define columns for the table
    const columns = _ColumnsComponent();

    const showModal = (record) => {
        form.resetFields();
        form.setFieldsValue({
            poDetailId: record.poDetailId,
            poItemDetilId: record.poItemDetilId,
        });
        setSelectedItem(record);
        setIsModalVisible(true);
    };
    const uploadModelShow = (record) => {

        uploadForm.resetFields();
        uploadForm.setFieldsValue({
            poDetailId: record.poDetailId,
            poItemDetilId: record.poItemDetilId,
        });
        setSelectedUploadItem(record);
        setIsModalUploadVisible(true);
    }
    const uploadModelCancel = () => {
        setIsModalUploadVisible(false);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const nestedcolumns = [
        {
            title: "Item Details",
            dataIndex: "text",
            key: "text",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Reciving Quantity",
            dataIndex: "itemRecivingQuantity",
            key: "itemRecivingQuantity",
        },
        {
            title: "Remaing Sr No",
            dataIndex: "serialNumberNotAvilable",
            key: "serialNumberNotAvilable",
        },
        {
            title: "Recive",
            key: "action",
            render: (text, record) =>
                record.quantity !== record.itemReceivingQuantity ? (
                    <Button type="primary" onClick={() => showModal(record)}>
                        Receiving
                    </Button>
                ) : null, // Don't render anything if the condition is false
        },
        ,
        {
            title: "Update Seriol NO",
            key: "action",
            render: (text, record) =>
                record.SerialNumberNotAvilable !== 0 ? (
                    <Button type="primary" onClick={() => uploadModelShow(record)}>
                        Upload
                    </Button>
                ) : null, // Don't render anything if the condition is false
        },
    ];



    return (
        <>
            {loading ? (<Spin size="large" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }} />) : (
                <div className="page-wrapper">
                    <div className="content container-fluid">
                        <div className="page-header">
                            <div className="content-page-header">
                                <h5>Po List</h5>
                                <div className="list-btn">
                                    <ul className="filter-list">
                                        {/* You can enable these buttons with the appropriate handlers */}
                                        <li>
                                            <div
                                                className="dropdown dropdown-action"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                title="Download"
                                            >
                                                <a
                                                    href="#"
                                                    className="btn-filters"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    <span>
                                                        <i className="fe fe-download"></i>
                                                    </span>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <ul className="d-block">
                                                        <li>
                                                            <a
                                                                className="d-flex align-items-center download-item"
                                                                href="javascript:void(0);"
                                                                download
                                                            >
                                                                <i className="far fa-file-pdf me-2"></i>PDF
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                className="d-flex align-items-center download-item"
                                                                href="javascript:void(0);"
                                                                download
                                                            >
                                                                <i className="far fa-file-text me-2"></i>CSV
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <a
                                                className="btn-filters"
                                                href="javascript:void(0);"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="bottom"
                                                title="Print"
                                            >
                                                <span>
                                                    <i className="fe fe-printer"></i>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="table-responsive" id="tb">
                                            <Table
                                                className="custom-table" // Apply custom CSS class
                                                columns={columns}
                                                dataSource={PoList}
                                                rowKey="poDetailId"
                                                expandable={{
                                                    expandedRowRender: (record) => (
                                                        <Table
                                                            columns={nestedcolumns}
                                                            dataSource={record.poItemDatas}
                                                        />
                                                    ),
                                                }}
                                            />

                                            <RecivingModel
                                                selectedItem={selectedItem}
                                                isModalVisible={isModalVisible}
                                                form={form}
                                                userData={userData}
                                                handleCancel={handleCancel}
                                                fillPoList={fillPoList}
                                            />
                                            <_UploadModel
                                                selectedUploadItem={selectedUploadItem}
                                                isModalUploadVisible={isModalUploadVisible}
                                                uploadForm={uploadForm}
                                                userData={userData}
                                              
                                                uploadModelCancel={uploadModelCancel}
                                                fillPoList={fillPoList}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
