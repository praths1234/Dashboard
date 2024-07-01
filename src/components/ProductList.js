// frontend/src/components/ProductList.js
import React , {useState , useEffect}  from 'react';
import Product from './Product';
//import products from '../constant/data';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/products');
                setProducts(response.data);
            } catch (error) {
                console.error("There was an error fetching the products!", error);
            }
        };
        
        fetchProducts();
    }, []);
    return (
        <div className="product-list">
            {products.map(product => (
                <Product key={product._id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
