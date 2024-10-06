import React from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";

const _ColumnsComponent = () => {
    const columns = [
        {
            title: "Po Number",
            dataIndex: "poNumber",
            key: "poNumber",
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <>
                    <Input
                        autoFocus
                        placeholder="Type text here"
                        value={selectedKeys[0] || ""}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : []);
                            confirm({ closeDropdown: false });
                        }}
                        onPressEnter={() => confirm()}
                        onBlur={() => confirm()}
                    />
                    <Button onClick={() => confirm()} type="primary">Search</Button>
                    <Button onClick={() => {
                        clearFilters();
                        setSelectedKeys([]);
                        confirm();
                    }} danger>Reset</Button>
                </>
            ),
            filterIcon: () => <SearchOutlined />,
            onFilter: (value, record) => record.poNumber.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: "Device Name",
            dataIndex: "deviceName",
            key: "deviceName",
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <>
                    <Input
                        autoFocus
                        placeholder="Type text here"
                        value={selectedKeys[0] || ""}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : []);
                            confirm({ closeDropdown: false });
                        }}
                        onPressEnter={() => confirm()}
                        onBlur={() => confirm()}
                    />
                    <Button onClick={() => confirm()} type="primary">Search</Button>
                    <Button onClick={() => {
                        clearFilters();
                        setSelectedKeys([]);
                        confirm();
                    }} danger>Reset</Button>
                </>
            ),
            filterIcon: () => <SearchOutlined />,
            onFilter: (value, record) => record.deviceName.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: "Procurement Type",
            dataIndex: "procurementNameType",
            key: "procurementNameType",
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <>
                    <Input
                        autoFocus
                        placeholder="Type text here"
                        value={selectedKeys[0] || ""}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : []);
                            confirm({ closeDropdown: false });
                        }}
                        onPressEnter={() => confirm()}
                        onBlur={() => confirm()}
                    />
                    <Button onClick={() => confirm()} type="primary">Search</Button>
                    <Button onClick={() => {
                        clearFilters();
                        setSelectedKeys([]);
                        confirm();
                    }} danger>Reset</Button>
                </>
            ),
            filterIcon: () => <SearchOutlined />,
            onFilter: (value, record) => record.procurementNameType.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: "Total Quantity",
            dataIndex: "totalQuantity",
            key: "totalQuantity",
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <>
                    <Input
                        autoFocus
                        placeholder="Type text here"
                        value={selectedKeys[0] || ""}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : []);
                            confirm({ closeDropdown: false });
                        }}
                        onPressEnter={() => confirm()}
                        onBlur={() => confirm()}
                    />
                    <Button onClick={() => confirm()} type="primary">Search</Button>
                    <Button onClick={() => {
                        clearFilters();
                        setSelectedKeys([]);
                        confirm();
                    }} danger>Reset</Button>
                </>
            ),
            filterIcon: () => <SearchOutlined />,
            onFilter: (value, record) => record.totalQuantity == value,
        },
        {
            title: "Recive Quantity",
            dataIndex: "reciveQuantity",
            key: "reciveQuantity",
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <>
                    <Input
                        autoFocus
                        placeholder="Type text here"
                        value={selectedKeys[0] || ""}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : []);
                            confirm({ closeDropdown: false });
                        }}
                        onPressEnter={() => confirm()}
                        onBlur={() => confirm()}
                    />
                    <Button onClick={() => confirm()} type="primary">Search</Button>
                    <Button onClick={() => {
                        clearFilters();
                        setSelectedKeys([]);
                        confirm();
                    }} danger>Reset</Button>
                </>
            ),
            filterIcon: () => <SearchOutlined />,
            onFilter: (value, record) => record.reciveQuantity == value,
        },
        {
            title: "Total Amount",
            dataIndex: "totalAmount",
            key: "totalAmount",
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <>
                    <Input
                        autoFocus
                        placeholder="Type text here"
                        value={selectedKeys[0] || ""}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : []);
                            confirm({ closeDropdown: false });
                        }}
                        onPressEnter={() => confirm()}
                        onBlur={() => confirm()}
                    />
                    <Button onClick={() => confirm()} type="primary">Search</Button>
                    <Button onClick={() => {
                        clearFilters();
                        setSelectedKeys([]);
                        confirm();
                    }} danger>Reset</Button>
                </>
            ),
            filterIcon: () => <SearchOutlined />,
            onFilter: (value, record) => record.totalAmount == value,
        },
    ];

    return columns;
};

export default _ColumnsComponent;
