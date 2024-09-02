// pages\Payment.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';
import '../css/Payment.css'; // Ensure you have appropriate styles
import UpiApps from '../components/UpiApps'; // Import UpiApps component

const Payment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const totalPrice = queryParams.get('totalPrice');
  const [upiLink, setUpiLink] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [copyButtonText] = useState('Open UPI Link');

  useEffect(() => {
    if (totalPrice) {
      const upiLink = `upi://pay?pn=pagedoor&pa=9177048373@sbi&cu=INR&am=${totalPrice}`;
      setUpiLink(upiLink);
      setQrCodeUrl(upiLink);
    }
  }, [totalPrice]);

  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code-canvas');
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `PaymentQRCode.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const handleOpenUpiLink = () => {
    window.open(upiLink, '_blank');
  };

  if (!totalPrice) {
    return <div>Loading...</div>;
  }

  return (
    <div className="payment-container">
      <h1>Payment</h1>
      <div className="order-summary">
        <p>Total Price: ₹{totalPrice}</p>
      </div>
      {qrCodeUrl && (
        <div className="qr-code">
          <QRCode
            id="qr-code-canvas"
            value={qrCodeUrl}
            size={256}
            bgColor="#ffffff"
            fgColor="#000000"
            includeMargin={true}
          />
          <p>Scan to pay</p>
          <button className="btn" onClick={downloadQRCode}>Download QR Code</button>
        </div>
      )}
      {upiLink && (
        <div className="upi-link">
          <button className="btn" onClick={handleOpenUpiLink}>{copyButtonText}</button>
        </div>
      )}
      {/* Add the UpiApps component here */}
      <UpiApps />
    </div>
  );
};

export default Payment;
