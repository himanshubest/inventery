import { React, useState } from 'react'
import { Modal, Accordion, Card } from 'react-bootstrap';
import { Form, Button, Input, Spin } from "antd";

const DeviceMaster = () => {
    const [show, setShow] = useState(false);
    const [model, setModel] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handelModelShow = () => setModel(true);

    const handelModelClose = () => setModel(false);
    return (
        <>
            <div className="page-wrapper">
                <div className="content container-fluid">

                    <div className="page-header">
                        <div className="content-page-header">
                            <h5>DeviceMaster</h5>
                            <div className="list-btn">
                                <ul className="filter-list">
                                    <li>
                                        <a className="btn btn-filters w-auto popup-toggle" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-original-title="filter" onClick={handleShow}><span className="me-2"><img src="/wwwroot/assets/img/icons/filter-icon.svg" alt="filter" /></span>Filter </a>
                                    </li>

                                    <li>
                                        <div className="dropdown dropdown-action" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="download">
                                            <a href="#" className="btn-filters" data-bs-toggle="dropdown" aria-expanded="false"><span><i className="fe fe-download"></i></span></a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <ul className="d-block">
                                                    <li>
                                                        <a className="d-flex align-items-center download-item" href="javascript:void(0);" download><i className="far fa-file-pdf me-2"></i>PDF</a>
                                                    </li>
                                                    <li>
                                                        <a className="d-flex align-items-center download-item" href="javascript:void(0);" download><i className="far fa-file-text me-2"></i>CVS</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <a className="btn-filters" href="javascript:void(0);" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-original-title="print"><span><i className="fe fe-printer"></i></span> </a>
                                    </li>
                                    <li>
                                        <a className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_inventory" onClick={handelModelShow}><i className="fa fa-plus-circle me-2" aria-hidden="true" ></i>Add New</a>
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




                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={show ? "toggle-sidebar ledge open-filter" : "toggle-sidebar ledge"}>
                <div class="sidebar-layout-filter">
                    <div class="sidebar-header ledge">
                        <h5>Device Filter</h5>
                        <a href="javascript:void(0);" class="sidebar-closes" onClick={handleClose}><i class="fa-regular fa-circle-xmark"></i></a>
                    </div>

                    <div class="sidebar-body">
                        <form action="#" autocomplete="off">

                            <div class="accordion accordion-last" id="accordionMain1">
                                <div class="card-header-new" id="headingOne">
                                    <h6 class="filter-title">
                                        <a href="javascript:void(0);" class="w-100" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Device Name
                                            <span class="float-end"><i class="fa-solid fa-chevron-down"></i></span>
                                        </a>
                                    </h6>
                                </div>
                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample1">
                                    <div class="card-body-chat">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div id="checkBoxes1">
                                                    <div class="form-custom">
                                                        <input type="text" class="form-control" id="member_search1" placeholder="Device Name" />
                                                        <span><img src="wwwroot/assets/img/icons/search.svg" alt="img" /></span>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="accordion" id="accordionMain2">

                                <div class="modal-footer">
                                    <a href="javascript:void(0);" data-bs-dismiss="modal" class="btn btn-back cancel-btn me-2" onClick={handleClose}>Cancel</a>
                                    <a href="#" data-bs-dismiss="modal" class="btn btn-primary paid-continue-btn">Add Payment</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Modal show={model} onHide={handelModelClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Device</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        autoComplete="off"
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 14 }}
                    //onFinish={(values) => submitdata(values)}

                    >

                        <div className="input-block mb-3">
                            <label htmlFor="userName" className="form-label">
                                Device Type
                            </label>
                            <Form.Item
                                name="DeviceType"

                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter Device Type",
                                    },
                                    { whitespace: true }
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Type your name" style={{ width: '380px', fontSize: '15px' }} />
                            </Form.Item>

                        </div>




                        <Form.Item wrapperCol={{ span: 24 }}>
                            <div class="modal-footer">
                                <button type="button"  className="btn btn-back cancel-btn me-2" onClick={handelModelClose}>Cancel</button>
                                <button type="submit"  className="btn btn-primary paid-continue-btn">Add Vendor</button>
                            </div>
                        </Form.Item>

                    </Form>
                </Modal.Body>
                
            </Modal>


        </>



    )
}
export default DeviceMaster
