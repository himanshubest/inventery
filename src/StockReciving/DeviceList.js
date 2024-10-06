import { React, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getBody, WithPOSTAPIKey } from "../api/common";
import { Device_ListData } from "../api/apicall";
import auth from "../api/auth";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Input, Table, Spin, Modal, Form, DatePicker, Upload } from "antd";
import "antd/dist/antd";
import "./CustomTable.css";

export default function DeviceList() {
   
    const [loading, setLoading] = useState(false);
   
    const [DeviceList, setDeviceList] = useState([]);
    const [userData, setUserData] = useState(new auth().getUser());

    useEffect(() => {
        setLoading(true);
        fillDeviceList();
    }, []);

    const fillDeviceList = () => {
        Device_ListData(new auth().getApiKey(), (err, res) => {
            setLoading(true);
            if (err) {
                toast.error("Could not connect to the internet " + err.message);
                setLoading(false);
                return;
            }

            let response = getBody(res);
            if (response.status.isSuccess) {
                console.log(response);
                setDeviceList(response.data);
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
    const columns = [
        {
            title: "Brand Name",
            dataIndex: "brandName",
            key: "brandName",
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => {
                return (
                    <>
                        <Input
                            autoFocus
                            placeholder="Type text here"
                            value={selectedKeys[0] || ""} // Ensure default empty string for better handling
                            onChange={(e) => {
                                setSelectedKeys(e.target.value ? [e.target.value] : []);
                                confirm({ closeDropdown: false });
                            }}
                            onPressEnter={() => {
                                confirm();
                            }}
                            onBlur={() => {
                                confirm();
                            }}
                        />
                        <Button
                            onClick={() => {
                                confirm();
                            }}
                            type="primary"
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                clearFilters(); // Clears the filters
                                setSelectedKeys([]); // Reset selectedKeys to empty array
                                confirm(); // Apply reset to show all records
                            }}
                            danger
                        >
                            Reset
                        </Button>
                    </>
                );
            },
            filterIcon: () => {
                return <SearchOutlined />;
            },
            onFilter: (value, record) => {
                return record.brandName.toLowerCase().includes(value.toLowerCase());
            },
        },
        {
            title: "Model Name",
            dataIndex: "modelName",
            key: "modelName",
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => {
                return (
                    <>
                        <Input
                            autoFocus
                            placeholder="Type text here"
                            value={selectedKeys[0] || ""} // Ensure default empty string for better handling
                            onChange={(e) => {
                                setSelectedKeys(e.target.value ? [e.target.value] : []);
                                confirm({ closeDropdown: false });
                            }}
                            onPressEnter={() => {
                                confirm();
                            }}
                            onBlur={() => {
                                confirm();
                            }}
                        />
                        <Button
                            onClick={() => {
                                confirm();
                            }}
                            type="primary"
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                clearFilters(); // Clears the filters
                                setSelectedKeys([]); // Reset selectedKeys to empty array
                                confirm(); // Apply reset to show all records
                            }}
                            danger
                        >
                            Reset
                        </Button>
                    </>
                );
            },
            filterIcon: () => {
                return <SearchOutlined />;
            },
            onFilter: (value, record) => {
                return record.modelName.toLowerCase().includes(value.toLowerCase());
            },
        },
        {
            title: "Barcode",
            dataIndex: "barcode",
            key: "barcode",
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => {
                return (
                    <>
                        <Input
                            autoFocus
                            placeholder="Type text here"
                            value={selectedKeys[0] || ""} // Ensure default empty string for better handling
                            onChange={(e) => {
                                setSelectedKeys(e.target.value ? [e.target.value] : []);
                                confirm({ closeDropdown: false });
                            }}
                            onPressEnter={() => {
                                confirm();
                            }}
                            onBlur={() => {
                                confirm();
                            }}
                        />
                        <Button
                            onClick={() => {
                                confirm();
                            }}
                            type="primary"
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                clearFilters(); // Clears the filters
                                setSelectedKeys([]); // Reset selectedKeys to empty array
                                confirm(); // Apply reset to show all records
                            }}
                            danger
                        >
                            Reset
                        </Button>
                    </>
                );
            },
            filterIcon: () => {
                return <SearchOutlined />;
            },
            onFilter: (value, record) => {
                return record.barcode
                    .toLowerCase()
                    .includes(value.toLowerCase());
            },
        },
        {
            title: "SerialNumber",
            dataIndex: "serialNumber",
            key: "serialNumber",
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => {
                return (
                    <>
                        <Input
                            autoFocus
                            placeholder="Type text here"
                            value={selectedKeys[0] || ""} // Ensure default empty string for better handling
                            onChange={(e) => {
                                setSelectedKeys(e.target.value ? [e.target.value] : []);
                                confirm({ closeDropdown: false });
                            }}
                            onPressEnter={() => {
                                confirm();
                            }}
                            onBlur={() => {
                                confirm();
                            }}
                        />
                        <Button
                            onClick={() => {
                                confirm();
                            }}
                            type="primary"
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                clearFilters(); // Clears the filters
                                setSelectedKeys([]); // Reset selectedKeys to empty array
                                confirm(); // Apply reset to show all records
                            }}
                            danger
                        >
                            Reset
                        </Button>
                    </>
                );
            },
            filterIcon: () => {
                return <SearchOutlined />;
            },
            onFilter: (value, record) => {
                return record.serialNumber.toLowerCase().includes(value.toLowerCase());
            },
        },
        {
            title: "QcStatus",
            dataIndex: "qcStatus",
            key: "qcStatus",
            render: (text) => (text ? "Yes" : "No"),  // Render boolean as Yes/No
            filters: [
                { text: 'Yes', value: true },
                { text: 'No', value: false },
            ],
            onFilter: (value, record) => record.qcStatus === value,
            filterMultiple: false,
            filterIcon: (filtered) => (
                <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
            ),
        },

        {
            title: "Procurement Type",
            dataIndex: "procurementType",
            key: "procurementType",
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => {
                return (
                    <>
                        <Input
                            autoFocus
                            placeholder="Type text here"
                            value={selectedKeys[0] || ""} // Ensure default empty string for better handling
                            onChange={(e) => {
                                setSelectedKeys(e.target.value ? [e.target.value] : []);
                                confirm({ closeDropdown: false });
                            }}
                            onPressEnter={() => {
                                confirm();
                            }}
                            onBlur={() => {
                                confirm();
                            }}
                        />
                        <Button
                            onClick={() => {
                                confirm();
                            }}
                            type="primary"
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                clearFilters(); // Clears the filters
                                setSelectedKeys([]); // Reset selectedKeys to empty array
                                confirm(); // Apply reset to show all records
                            }}
                            danger
                        >
                            Reset
                        </Button>
                    </>
                );
            },
            filterIcon: () => {
                return <SearchOutlined />;
            },
            onFilter: (value, record) => {
                return record.procurementType.toLowerCase().includes(value.toLowerCase());
            },
        },
    ];

   
   
    return (
        <>
            { loading ? (<Spin size="large" style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }} />) : (
                <div className="page-wrapper">
                    <div className="content container-fluid">
                        <div className="page-header">
                            <div className="content-page-header">
                                <h5>Device List</h5>
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
                                                dataSource={DeviceList}
                                                rowKey="receivingDeviceDetailId"
                                                expandable={{
                                                    expandedRowRender: (record) => <p>{record.text}</p>, // Render content in expanded row
                                                    
                                                  }}
                                               
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
