import React, { useState , useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const Wallet = () => {
    // Mock data for user's wallet balance
    const [walletBalance, setWalletBalance] = useState(); 
    const [qrCodeData, setQrCodeData] = useState('');
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem('user')).data._id;
    useEffect(() => {
        // Fetch the wallet balance using the user ID
        const fetchWalletBalance = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/wallet/${userId}`);
                setWalletBalance(response.data.balance);
                console.log(walletBalance);
            } catch (error) {
                console.error('Error fetching wallet balance:', error);
            }
        };

        fetchWalletBalance();
    }, [userId]);
    const handlePaymentDone = () => {
        navigate('/payment-form');
    };

    return (
        <div>
            <h3>User Wallet</h3>
            <div style={{ marginBottom: '20px' }}>
                <p><strong>Wallet Balance:</strong> ${walletBalance}</p>
            </div>
            <h3>Scan this QR Code:</h3>
            <div>
                <img 
                    src="/qrcode2.jpg" 
                    alt="QR Code" 
                    style={{ width: '200px', height: '200px' }} 
                />
            </div>
            {qrCodeData && (
                <div>
                    <h4>QR Code Data:</h4>
                    <p>{qrCodeData}</p>
                </div>
            )}
            
            <button onClick={handlePaymentDone} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
                Payment Done
            </button>
        </div>
    );
};

export default Wallet;
