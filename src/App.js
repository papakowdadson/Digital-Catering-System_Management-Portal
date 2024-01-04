import logo from './logo.svg';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import OrdersPage from './pages/OrdersPage';
import ManagementPage from './pages/ManagementPage';
import GenQrPage from './pages/GenQrPage';
import Nav from './components/Nav';

function App() {
  return (
    <>
      <Router>
      <Nav/>
        <Routes>      
          <Route path='/' element={<OrdersPage/>}/>
          <Route path='/mgt' element={<ManagementPage/>}/>
          <Route path='/genqr' element={<GenQrPage/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
