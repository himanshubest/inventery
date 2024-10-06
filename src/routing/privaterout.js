import {React,useEffect,useState} from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import auth from '../api/auth';
import Header from '../shared/Header '
import Sidebar from '../shared/Sidebar'
 
const PrivateRoute = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null); // `null` indicates loading state
    
    const [isMiniSidebar, setIsMiniSidebar] = useState(false);
    const [isMobSidebar, setIsMobSidebar] = useState(false);
    const [isSidebar, setIsSidebar] = useState(false);

  // Function to toggle the mini-sidebar class
  const toggleSidebar = () => {
    setIsMiniSidebar(!isMiniSidebar);
  };
  const mobliSidebar = () => {
    setIsMobSidebar(!isMobSidebar);
  };
  const sideBarMenu = () => {
    
    if(isMiniSidebar)
    {
      setIsMiniSidebar(!isMiniSidebar);
    }
  };
    
    
    useEffect(() => {
      const checkAuth = async () => {
        const loggedIn = await (new auth()).isUserLoggedIn();
        setIsLoggedIn(loggedIn);
      };
      checkAuth();
    }, []);
  
    if (isLoggedIn === null) {
      // Optionally, return a loading spinner or nothing while checking mini-sidebar
      return <div>Loading...</div>;
    }
  
    return isLoggedIn ? <>
    <div className={isMiniSidebar ? 'main-wrapper mini-sidebar' : isMobSidebar?'main-wrapper slide-nav':'main-wrapper' }>
      <Header toggleSidebar={toggleSidebar} mobliSidebar={mobliSidebar}/>
      <Sidebar sideBarMenu={sideBarMenu} />
      <Outlet /></div></> : <Navigate to="/login" />;
  };
  
  export default PrivateRoute;