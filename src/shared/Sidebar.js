import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ sideBarMenu }) => {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(''); // Single state for open submenu
    const [activeMenu, setActiveMenu] = useState('');

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? '' : menu); // Toggle current submenu
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        navigate('/' + menu);
    };

    const menuItems = [
        {
            title: 'Master',
            icon: 'fe fe-home',
            subMenu: [
                { name: 'DeviceMaster', label: 'Device Type' },
                { name: 'DeviceModelType', label: 'Device Model Type' },
                { name: 'BrandDetails', label: 'Brand Details' },
                { name: 'DeviceProcessor', label: 'Device Processor' },
                { name: 'GenerationDetail', label: 'Generation Detail' },
                { name: 'RAMDetail', label: 'RAM Detail' },
                { name: 'HardDiskDetail', label: 'HardDisk Detail' },
                { name: 'ProcurementTypes', label: 'Procurement Types' }
            ]
        },
        {
            title: 'Vendor Master',
            icon: 'fe fe-home',
            subMenu: [{ name: 'VendorDetails', label: 'Vendor Details' }]
        },
        {
            title: 'PO Master',
            icon: 'fe fe-home',
            subMenu: [
                { name: 'ListPo', label: 'Po List', isLink: true },
                { name: 'CreatePo', label: 'Create Po', isLink: true },
                { name: 'StockRecivingBulk', label: 'Stock Reciving with SrNo', isLink: true }
            ]
        },
        ,
        {
            title: 'Device Master',
            icon: 'fe fe-home',
            subMenu: [
                { name: 'DeviceList', label: 'Device List', isLink: true },
                
            ]
        }
    ];

    return (
        <div className="sidebar" id="sidebar" onMouseOver={sideBarMenu}>
            <div className="sidebar-inner slimscroll">
                <div id="sidebar-menu" className="sidebar-menu">
                    <ul className="sidebar-vertical">
                        <li className="menu-title">
                            <span>Main</span>
                        </li>

                        {/* Dynamic menu rendering */}
                        {menuItems.map((menuItem, index) => (
                            <li className="submenu" key={index}>
                                <a href="#" onClick={() => toggleMenu(menuItem.title)}>
                                    <i className={menuItem.icon}></i>
                                    <span>{menuItem.title}</span>
                                    <span className="menu-arrow"></span>
                                </a>
                                <ul style={{ display: openMenu === menuItem.title ? 'block' : 'none' }}>
                                    {menuItem.subMenu.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                            {subItem.isLink ? (
                                                <Link
                                                    to={subItem.name}
                                                    className={activeMenu === subItem.name ? 'active' : ''}
                                                    onClick={() => setActiveMenu(subItem.name)}
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ) : (
                                                <a
                                                    href="#"
                                                    className={activeMenu === subItem.name ? 'active' : ''}
                                                    onClick={() => handleMenuClick(subItem.name)}
                                                >
                                                    {subItem.label}
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
