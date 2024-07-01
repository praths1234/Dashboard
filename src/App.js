import './App.css';
import Nav from './components/Nav';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import PrivateComponent from './components/PrivateComponent'
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Customizer from './components/Customizer';
import UpdatedProduct from './components/updatedProduct';
import MyProducts from './components/MyProducts';
import Order from './components/Order';
import ShippingAddress from './components/ShippingAddress';
import Wallet from './components/Wallet';
import PaymentForm from './components/PaymentForm';
function App() {
  //const { id } = useParams();
 
  return (
    
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route element = {<PrivateComponent/>} >
        <Route path="/" element={<h1>Dashboard</h1>} />
        <Route path="/addProduct" element={<ProductList/>} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/customize/:id" element={<Customizer />} />
        <Route path="/updatedProduct/:designId" element={<UpdatedProduct />} />
        <Route path="/shipping/:productId/:designId" element={<ShippingAddress />} />
        <Route path='/my-products' element={<MyProducts/> } />
        <Route path="/order" element={<Order />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/payment-form" element={<PaymentForm />} />
        <Route path="/profile" element={<h1>Account details</h1>} />
        <Route path="/logout" element={<h1>Log out</h1>} />
        </Route>
        <Route path='/signup' element={<Signup /> } />
        <Route path='/login' element={<Login />} />
        </Routes>
    </BrowserRouter>
    <Footer />
    </div>
  );
}

export default App;
