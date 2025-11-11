import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Recharge = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    mobileNumber: '',
    operator: '',
    circle: ''
  });
  const [loading, setLoading] = useState(false);

  const operators = ['Airtel', 'Jio', 'Vi', 'BSNL'];
  const circles = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Gujarat', 
    'Haryana', 'Karnataka', 'Kerala', 'Maharashtra', 'Punjab',
    'Rajasthan', 'Tamil Nadu', 'Uttar Pradesh', 'West Bengal'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      // Create payment order
      const orderResponse = await axios.post('/api/payment/create-order', {
        amount: 5
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // For demo - simulate payment success
      const paymentSuccess = await axios.post('/api/payment/verify-payment', {
        order_id: orderResponse.data.id,
        payment_id: `pay_${Date.now()}`
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (paymentSuccess.data.success) {
        // Create recharge
        const rechargeResponse = await axios.post('/api/recharge/create', {
          ...formData,
          paymentId: paymentSuccess.data.paymentId
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        toast.success('Recharge successful! Commission distributed to upline.');
        setFormData({ mobileNumber: '', operator: '', circle: '' });
      }
    } catch (error) {
      toast.error('Recharge failed. Please try again.');
      console.error('Recharge error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Mobile Recharge - ₹5
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                maxLength="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter 10-digit mobile number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Operator
              </label>
              <select
                name="operator"
                value={formData.operator}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Operator</option>
                {operators.map(op => (
                  <option key={op} value={op}>{op}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Circle
              </label>
              <select
                name="circle"
                value={formData.circle}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Circle</option>
                {circles.map(circle => (
                  <option key={circle} value={circle}>{circle}</option>
                ))}
              </select>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Commission Structure:</strong><br />
                • Direct referral: ₹1<br />
                • Level 2: ₹0.50<br />
                • Earn when your network recharges!
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Processing...' : 'Pay ₹5 & Recharge'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Recharge;
