import React, { useState ,useEffect} from "react";
import { Dropdown } from 'react-bootstrap';
import { Avatar } from "antd";
import './bootstrap.min.css'
import auth from "../api/auth";
import { useNavigate } from "react-router-dom";
import { getBody } from '../api/common';

const Header = ({ toggleSidebar,mobliSidebar }) => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    //const [sidData, setSidData] = useState(false);

    const Logout=()=>{
        (new auth()).removeData();
        navigate('/login');
    }
    
    useEffect(() => {
       const storedUserData = (new auth).getUser();
       //onst storedUserData = (new auth).getUser();
       if (storedUserData) {
        try {
          const parsedData = JSON.parse(storedUserData); // Safely parse the data
          setUserData(parsedData); // Set state with parsed data
        } catch (error) {
          console.error('Error parsing session data:', error); // Handle any JSON parsing error
        }
      } else {
        console.log('No user data found in session storage.');
      }
    }, []);
    return (
        <div className="header header-one">
            <a
                href="index.html"
                className="d-inline-flex d-sm-inline-flex align-items-center d-md-inline-flex d-lg-none align-items-center device-logo"
            >

                <img
                    src="/wwwroot/assets/img/logo.png"
                    className="img-fluid logo2"
                    alt="Logo"
                />
            </a>

            <div className="main-logo d-inline float-start d-lg-flex align-items-center d-none d-sm-none d-md-none">
                <div className="logo-white">
                    <a href="index.html">
                        <img
                            src="/wwwroot/assets/img/logo.webp"
                            className="img-fluid logo-blue"
                            alt="Logo"
                        />
                    </a>
                    <a href="index.html">
                        <img
                            src="/wwwroot/assets/img/logo.webp"
                            className="img-fluid logo-small"
                            alt="Logo"
                        />
                    </a>
                </div>
                <div className="logo-color">
                    <a href="index.html">
                        <img
                            src="/wwwroot/assets/img/logo.webp"
                            className="img-fluid logo-blue"
                            alt="Logo"
                        />
                    </a>
                    <a href="index.html">
                        <img
                            src="/wwwroot/assets/img/logo.webp"
                            className="img-fluid logo-small"
                            alt="Logo"
                        />
                    </a>
                </div>
            </div>

            <a href="javascript:void(0);" id="toggle_btn" onClick={toggleSidebar}>
                <span className="toggle-bars">
                    <span className="bar-icons" style={{backgroundColor:"black"}}></span>
                    <span className="bar-icons" style={{backgroundColor:"black"}}></span>
                    <span className="bar-icons" style={{backgroundColor:"black"}}></span>
                    <span className="bar-icons" style={{backgroundColor:"black"}}></span>
                </span>
            </a>

            <div className="top-nav-search">
                <form>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search here"
                    />
                    <button className="btn" type="submit">
                        <img src="/wwwroot/assets/img/icons/search.svg" alt="img" />
                    </button>
                </form>
            </div>

            <a className="mobile_btn" id="mobile_btn" onClick={mobliSidebar}>
                <i className="fas fa-bars"></i>
            </a>

            <ul className="nav nav-tabs user-menu">
                <li className="nav-item dropdown">

                    <Dropdown>
                        <Dropdown.Toggle  variant="success" id="dropdown-basic">
                            <span className="user-img">
                                <Avatar src="/wwwroot/assets/img/profiles/avatar-07.jpg" />
                            </span>
                            <span className="user-content">
                                <span className="user-details">Admin</span>
                                {userData ? <span className="user-name">{userData.firstName}</span>:<span className="user-name"></span>}  
                            </span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="profile.html">Profile</Dropdown.Item>
                            <Dropdown.Item href="settings.html">Settings</Dropdown.Item>
                            <Dropdown.Item onClick={Logout}>Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>




            </ul>
        </div>
    );
};

export default Header;
