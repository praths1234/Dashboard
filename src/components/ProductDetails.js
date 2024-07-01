import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-details">
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>By {product.brand}</p>
            <p>From USD {product.price}</p>
            <p>From USD {product.premiumPrice} with Printify Premium</p>
            <p>{product.sizes.length} sizes • {product.colors.length} colors • {product.providers} print providers</p>
            
        </div>
    );
};

export default ProductDetails;
