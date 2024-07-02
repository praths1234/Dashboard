import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const PaymentForm = () => {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        userEmail: '',
        paymentReference: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/submitPaymentForm', formData);
            alert(response.data.message);
            alert('Your wallet balance will be updated shortly'); // Alert success message
            // Optionally, clear the form after successful submission
            setFormData({
                userId: '',
                paymentReference: ''
            });
            navigate('/');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit form. Please try again.'); // Alert error message
        }
    };

    return (
        <div>
            <h3>Payment Form</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        User Email:
                        <input
                            type="text"
                            name="userEmail"
                            value={formData.userEmail}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Payment Reference Number:
                        <input
                            type="text"
                            name="paymentReference"
                            value={formData.paymentReference}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
