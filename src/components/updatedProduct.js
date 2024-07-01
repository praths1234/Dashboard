import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatedProduct = () => {
    const { designId } = useParams();
    const [design, setDesign] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchDesign = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/designs/${designId}`);
                console.log('Design data:', response.data);
                console.log('Image base64:', response.data.customizedImage);
                setDesign(response.data);
            } catch (error) {
                console.error('Error fetching design:', error);
            }
        };

        fetchDesign();
    }, [designId]);

    const handleOrder = (productId, designId) => {
        navigate(`/shipping/${productId}/${designId}`);
      };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:4000/designs/${designId}`);
            console.log('Design deleted:', designId);
            alert('Design deleted successfully!');
            // Redirect to another page after deletion, e.g., the homepage
            navigate('/');
        } catch (error) {
            console.error('Error deleting design:', error);
            alert('Failed to delete the design.');
        }
    };

    if (!design) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Customized Product</h1>
            <div>
                <h2>Product Details</h2>
                <p><strong>Color:</strong> {design.color}</p>
                <p><strong>Size:</strong> {design.size}</p>
                <p><strong>Text:</strong> <div dangerouslySetInnerHTML={{ __html: design.text }} /></p>
                <p><strong>Text Position:</strong> {JSON.stringify(design.textPosition)}</p>
                <p><strong>Image Position:</strong> {JSON.stringify(design.imagePosition)}</p>
            </div>
            <div>
                <h2>Customized Image</h2>
                {design.customizedImage && (
                    <img src={design.customizedImage} alt="Customized Product" />
                    
                )}
            </div>
            <button onClick={() => handleOrder(design.productId,design._id) }>Order Now</button>
            <button onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>Delete Product</button>
        </div>
    );
};

export default UpdatedProduct;
