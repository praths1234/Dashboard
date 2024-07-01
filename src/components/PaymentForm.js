import React, { useState } from 'react';

const PaymentForm = () => {
    const [formData, setFormData] = useState({
        userId: '',
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
        alert('Data Submitted Successfully');
    };

    return (
        <div>
            <h3>Payment Form</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        User ID:
                        <input
                            type="text"
                            name="userId"
                            value={formData.userId}
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
