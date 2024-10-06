
import './App.css';
import _LoginLayout from './login/_LoginLayout';
import Privateroute from './routing/privaterout';
import AdminDashboard from './dashboard/DeviceMaster';
import Login from './login/login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePo from './PoDetails/CreatePo';
import ListPo from './PoDetails/ListPo';
import StockRecivingBulk from './StockReciving/StockRecivingBulk';
import DeviceList from './StockReciving/DeviceList';
function App() {
  return (
    
    <Router>
      <ToastContainer  position='top-right' theme="colored"/>
      <Routes>
        
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={<Privateroute />}>
            <Route path="/DeviceMaster" element={<AdminDashboard />} />
            <Route path="/CreatePo" element={<CreatePo />} />
            <Route path="/ListPo" element={<ListPo />} />
            <Route path="/StockRecivingBulk" element={<StockRecivingBulk />} />
            <Route path="/DeviceList" element={<DeviceList />} />
      </Route>
        
        </Routes>
    </Router>
  );
}

export default App;
