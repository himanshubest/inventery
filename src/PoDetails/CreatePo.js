import { React, useEffect, useState } from 'react'
import { Row, Col, Select, DatePicker, Input, Form, Option, TextArea, Button, InputNumber, Typography, Spin } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Get_MasterData, Create_PO } from '../api/apicall';
import auth from '../api/auth';
import { toast } from 'react-toastify';
import { getBody } from '../api/common';
import { useNavigate } from 'react-router-dom';
export default function CreatePo() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState({
        notes: '',
        termsAndConditions: '',
        taxableAmount: 0,
        actualAmount: 0,
        discountAmt: 0,
        sgst: 0,
        cgst: 0,
        totalAmount: 0,
        signatureName: ''
    });

    const calculateAmounts = () => {

        const values = form.getFieldsValue();
        let taxableAmount = 0;



        for (let i = 0; i < rows.length; i++) {

            taxableAmount = parseFloat(taxableAmount) + (parseFloat(values[`quantity_${i}`]) || 0) * (parseFloat(values[`price_${i}`]) || 0)

        }

        const sgst = (taxableAmount * 0.09).toFixed(2);
        const cgst = (taxableAmount * 0.09).toFixed(2);
        const totalAmount = (taxableAmount + parseFloat(sgst) + parseFloat(cgst)).toFixed(2);

        setFormValues({
            ...formValues,
            taxableAmount,
            taxableAmount,
            sgst,
            cgst,
            totalAmount
        });
    };
    const { Title, Text } = Typography;

    const [loading, setLoading] = useState(false);
    const { TextArea } = Input;
    const [brands, setBrand] = useState([]);
    const [models, setmodels] = useState([]);
    const [processors, setprocessors] = useState([]);
    const [generations, setgenerations] = useState([]);
    const [rams, setrams] = useState([]);
    const [hardDisks, sethardDisks] = useState([]);
    const [vendors, setvendors] = useState([]);
    const [procurement, setprocurement] = useState([]);

    const [rows, setRows] = useState([{ key: Date.now() }]);
    useEffect(() => {

        Get_MasterData((new auth).getToken(), (new auth).getApiKey(), (err, res) => {
            if (err) {

                toast.error("Could not connect to the internet " + err.message);
                setLoading(false);
                return;
            }


            let response = getBody(res);
            if (response.status.isSuccess) {
                setBrand(response.data.brandDetails);
                setvendors(response.data.vendorDetails);
                setmodels(response.data.modeldetails);
                setprocessors(response.data.deviceProcessorDetails);
                setgenerations(response.data.generationDetails);
                setrams(response.data.rAMDetails);
                sethardDisks(response.data.hardDiskDetails);
                setprocurement(response.data.procurementTypes);
                (new auth).setApiKey(res.headers['x-unique-key'], (new auth).getToken());
            }
            else {
                toast.error(response.status.message);
                setLoading(false);
                return;
            }

        })
    }, []);
    const addRow = () => {
        setRows([...rows, { key: Date.now() }]);
    };

    const removeRow = (key) => {
        setRows(rows.filter((row) => row.key !== key));
    };
    const handleSubmit = (values) => {
        setLoading(true);
        const laptopItems = [];

        // Dynamically find the number of laptop items (assuming the form data follows this pattern)
        const keys = Object.keys(values);
        const rowCount = keys.filter(key => key.startsWith('brand_')).length;  // Number of laptop items

        for (let i = 0; i < rowCount; i++) {
            laptopItems.push({
                brand: values[`brand_${i}`],
                model: values[`model_${i}`],
                processor: values[`processor_${i}`],
                generation: values[`generation_${i}`],
                ram: values[`ram_${i}`],
                hardDisk: values[`harddisk_${i}`],
                quantity: parseInt(values[`quantity_${i}`], 10),  // Convert quantity to number
                price: parseFloat(values[`price_${i}`]),  // Convert price to number
                description: values[`description_${i}`]
            });
        }

        // Create the final transformed payload
        const payload = {
            vendorName: values.vendorName,
            procurementType: values.procurementType,
            purchaseDate: values.purchaseDate,
            deliveryDate: values.deliveryDate,
            rentStartDate: values.rentStartDate,
            warranty: values.warranty,
            tenure: values.tenure,
            ...formValues,

            laptopItems: laptopItems
        };
        //console.log(payload);
        Create_PO(payload, (err, res) => {
            if (err) {

                toast.error("Could not connect to the internet " + err.message);
                setLoading(false);
                return;
            }
            let data = getBody(res);
            if (data.status.isSuccess) {
                toast.success('Po Genrate Successfully', {

                    autoClose: 3000, // 3 seconds
                });


                setLoading(false);
                // window.location.reload();
                navigate('/ListPo');
            }
            else {
                toast.error(data.status.message);
                setLoading(false);
                return;
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
                }} />) :

                    <div class="page-wrapper" data-select2-id="18" >
                        <div class="content container-fluid" data-select2-id="17">
                            <div class="card mb-0" data-select2-id="16">

                                <Form
                                    form={form}
                                    layout="vertical" // You can change the layout to 'horizontal' or 'inline' if preferred
                                    onFinish={(values) => handleSubmit(values)} autoComplete="off"
                                    initialValues={{
                                        // You can set initial form values here
                                    }}
                                >
                                    <div class="card-body" data-select2-id="15">
                                        <div class="page-header">
                                            <div class="content-page-header">
                                                <h5>Laptop PO Create</h5>
                                            </div>
                                        </div>
                                        <div class="row" data-select2-id="14">
                                            <div class="col-md-12" data-select2-id="13">
                                                <div class="form-group-item" data-select2-id="12">

                                                    <div class="row" data-select2-id="11">


                                                        <Row gutter={16}>
                                                            {/* Vendor Name Select */}
                                                            <Col lg={8} md={12} sm={24}>
                                                                <Form.Item
                                                                    label="Vendor Name"
                                                                    name="vendorName"
                                                                    rules={[{ required: true, message: 'Please select a vendor' }]}
                                                                >
                                                                    <Select allowClear showSearch placeholder="Select VendorName" filterOption={(input, option) =>
                                                                        option.children.toLowerCase().includes(input.toLowerCase()) // filters by the displayed text
                                                                    }>
                                                                        {vendors.map((item, index) => (
                                                                            <Select.Option key={index} value={item.value}>{item.text}</Select.Option>
                                                                        ))}
                                                                    </Select>
                                                                </Form.Item>
                                                            </Col>

                                                            {/* Procurement Type Select */}
                                                            <Col lg={8} md={12} sm={24}>
                                                                <Form.Item
                                                                    label="Procurement Type"
                                                                    name="procurementType"
                                                                    rules={[{ required: true, message: 'Please select a procurement type' }]}
                                                                >
                                                                    <Select allowClear showSearch placeholder="Select Procurement Type" filterOption={(input, option) =>
                                                                        option.children.toLowerCase().includes(input.toLowerCase())
                                                                    }>
                                                                        {procurement.map((item, index) => (
                                                                            <Select.Option key={index} value={item.value}>{item.text}</Select.Option>
                                                                        ))}
                                                                    </Select>
                                                                </Form.Item>
                                                            </Col>

                                                            {/* Purchase Date */}
                                                            <Col lg={8} md={12} sm={24}>
                                                                <Form.Item
                                                                    label="Purchase Date"
                                                                    name="purchaseDate"
                                                                    rules={[{ required: true, message: 'Please select a purchase date' }]}
                                                                >
                                                                    <DatePicker placeholder="Select Purchase Date" style={{ width: "100%" }} />
                                                                </Form.Item>
                                                            </Col>

                                                            {/* Delivery Date */}
                                                            <Col lg={8} md={12} sm={24}>
                                                                <Form.Item
                                                                    label="Delivery Date"
                                                                    name="deliveryDate"
                                                                    rules={[{ required: true, message: 'Please select a delivery date' }]}
                                                                >
                                                                    <DatePicker placeholder="Select Delivery Date" style={{ width: "100%" }} />
                                                                </Form.Item>
                                                            </Col>

                                                            {/* Rent Start Date */}
                                                            <Col lg={8} md={12} sm={24} id="Rentdiv">
                                                                <Form.Item
                                                                    label="Rent Start Date"
                                                                    name="rentStartDate"
                                                                    rules={[{ required: false, message: 'Please select a rent start date' }]}
                                                                >
                                                                    <DatePicker placeholder="Select Rent Start Date" style={{ width: "100%" }} />
                                                                </Form.Item>
                                                            </Col>

                                                            {/* Tenure */}
                                                            <Col lg={4} md={12} sm={24}>
                                                                <Form.Item
                                                                    shouldUpdate={(prevValues, currentValues) => prevValues.procurementType !== currentValues.procurementType}>
                                                                    {({ getFieldValue }) => {
                                                                        return getFieldValue('procurementType') !== 1 ? (
                                                                            <Form.Item
                                                                                label="Tenure"
                                                                                name="tenure"
                                                                                rules={[{ required: true, message: 'Please enter the tenure' }]}>
                                                                                <Input type="number" placeholder="Enter Tenure" />
                                                                            </Form.Item>
                                                                        ) : null;
                                                                    }}
                                                                </Form.Item>
                                                            </Col>

                                                            {/* Warranty */}
                                                            <Col lg={4} md={12} sm={24} id="Warrantydiv">
                                                                <Form.Item
                                                                    label="Warranty"
                                                                    name="warranty"
                                                                    rules={[{ required: false, message: 'Please enter the warranty period' }]}
                                                                >
                                                                    <Input type="number" placeholder="Enter Warranty" />
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>





                                                    </div>
                                                </div>
                                            </div>



                                        </div>

                                        {rows.map((row, index) => (
                                            <Row gutter={16} key={row.key} align="middle">
                                                {/* Brand Name */}
                                                <Col span={4}>
                                                    <Form.Item name={`brand_${index}`} rules={[{ required: true, message: 'Required' }]}>
                                                        <Select allowClear showSearch placeholder="Brand" filterOption={(input, option) =>
                                                            option.children.toLowerCase().includes(input.toLowerCase())
                                                        }>
                                                            {brands.map((brand) => (
                                                                <Select.Option key={brand.value} value={brand.value}>
                                                                    {brand.text}
                                                                </Select.Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>

                                                {/* Model Name */}
                                                <Col span={4}>
                                                    <Form.Item name={`model_${index}`} rules={[{ required: true, message: 'Required' }]}>
                                                        <Select allowClear showSearch placeholder="Model" filterOption={(input, option) =>
                                                            option.children.toLowerCase().includes(input.toLowerCase())
                                                        }>
                                                            {models.map((model) => (
                                                                <Select.Option key={model.value} value={model.value}>
                                                                    {model.text}
                                                                </Select.Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>

                                                {/* Processor */}
                                                <Col span={4}>
                                                    <Form.Item name={`processor_${index}`} rules={[{ required: true, message: 'Required' }]}>
                                                        <Select allowClear showSearch placeholder="Processor" filterOption={(input, option) =>
                                                            option.children.toLowerCase().includes(input.toLowerCase())
                                                        }>
                                                            {processors.map((processor) => (
                                                                <Select.Option key={processor.value} value={processor.value}>
                                                                    {processor.text}
                                                                </Select.Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>

                                                {/* Generation */}
                                                <Col span={4}>
                                                    <Form.Item name={`generation_${index}`} rules={[{ required: true, message: 'Required' }]}>
                                                        <Select allowClear showSearch placeholder="Generation" filterOption={(input, option) =>
                                                            option.children.toLowerCase().includes(input.toLowerCase())
                                                        }>
                                                            {generations.map((generation) => (
                                                                <Select.Option key={generation.value} value={generation.value}>
                                                                    {generation.text}
                                                                </Select.Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>

                                                {/* RAM */}
                                                <Col span={4}>
                                                    <Form.Item name={`ram_${index}`} rules={[{ required: true, message: 'Required' }]}>
                                                        <Select allowClear showSearch placeholder="RAM" filterOption={(input, option) =>
                                                            option.children.toLowerCase().includes(input.toLowerCase())
                                                        }>
                                                            {rams.map((ram) => (
                                                                <Select.Option key={ram.value} value={ram.value}>
                                                                    {ram.text}
                                                                </Select.Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>

                                                {/* Hard Disk */}
                                                <Col span={4}>
                                                    <Form.Item name={`harddisk_${index}`} rules={[{ required: true, message: 'Required' }]}>
                                                        <Select allowClear showSearch placeholder="Hard Disk" filterOption={(input, option) =>
                                                            option.children.toLowerCase().includes(input.toLowerCase())
                                                        }>
                                                            {hardDisks.map((disk) => (
                                                                <Select.Option key={disk.value} value={disk.value}>
                                                                    {disk.text}
                                                                </Select.Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>

                                                {/* Quantity */}
                                                <Col span={3}>
                                                    <Form.Item name={`quantity_${index}`} rules={[{ required: true, message: 'Required' }]}>
                                                        <Input type="number" placeholder="Quantity" onBlur={() => calculateAmounts()} />
                                                    </Form.Item>
                                                </Col>

                                                {/* Price */}
                                                <Col span={3}>
                                                    <Form.Item name={`price_${index}`} rules={[{ required: true, message: 'Required' }]}>
                                                        <Input type="number" placeholder="Price" onBlur={() => calculateAmounts()} />
                                                    </Form.Item>
                                                </Col>

                                                {/* Description */}
                                                <Col span={6}>
                                                    <Form.Item name={`description_${index}`} rules={[{ required: true, message: 'Required' }]}>
                                                        <TextArea placeholder="Description" rows={1} />
                                                    </Form.Item>
                                                </Col>

                                                {/* Remove Button */}
                                                <Col span={2}>
                                                    <Form.Item>
                                                        <Button danger onClick={() => removeRow(row.key)} icon={<MinusCircleOutlined />} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        ))}




                                        <Form.Item>
                                            <Button type="dashed" onClick={addRow} icon={<PlusOutlined />}>
                                                Add Item
                                            </Button>
                                        </Form.Item>


                                        <div className="row">
                                            <div className="col-xl-6 col-lg-12">
                                                <Form.Item label="Notes">
                                                    <TextArea
                                                        placeholder="Enter Notes"
                                                        value={formValues.notes}
                                                        onChange={(e) => setFormValues({ ...formValues, notes: e.target.value })}
                                                    />
                                                </Form.Item>

                                                <Form.Item label="Terms and Conditions">
                                                    <TextArea
                                                        placeholder="Enter Terms and Conditions"
                                                        value={formValues.termsAndConditions}
                                                        onChange={(e) => setFormValues({ ...formValues, termsAndConditions: e.target.value })}
                                                    />
                                                </Form.Item>
                                            </div>

                                            <div className="col-xl-6 col-lg-12">
                                                <div className="invoice-total-box">
                                                    <div className="invoice-total-inner">
                                                        <p>Taxable Amount <span>&#8377;<b>{formValues.taxableAmount}</b></span></p>


                                                        <p>Discount <span>-&#8377;<b>{formValues.discountAmt}</b></span></p>


                                                        <p>SGST(9%) <span>&#8377;<b>{formValues.sgst}</b></span></p>
                                                        <p>CGST(9%) <span>&#8377;<b>{formValues.cgst}</b></span></p>
                                                    </div>

                                                    <div className="invoice-total-footer">
                                                        <Title level={4}>
                                                            Total Amount <span>&#8377;<b>{formValues.totalAmount}</b></span>
                                                        </Title>
                                                    </div>
                                                </div>

                                                <Form.Item label="Signature Name">
                                                    <Input
                                                        placeholder="Enter Signature Name"
                                                        value={formValues.signatureName}
                                                        onChange={(e) => setFormValues({ ...formValues, signatureName: e.target.value })}
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>


                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                Submit
                                            </Button>
                                        </Form.Item>





                                    </div>

                                </Form>

                            </div>
                        </div>
                    </div>
            }

        </>
    )
}
