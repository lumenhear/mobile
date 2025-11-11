import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';

const ReferralSection = ({ user }) => {
  const referralLink = `${window.location.origin}/register?ref=${user?.referralCode}`;

  const handleCopy = () => {
    toast.success('Referral link copied to clipboard!');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Your Referral</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Referral Code
          </label>
          <div className="flex">
            <input
              type="text"
              value={user?.referralCode}
              readOnly
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg bg-gray-50"
            />
            <CopyToClipboard text={user?.referralCode} onCopy={handleCopy}>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">
                Copy
              </button>
            </CopyToClipboard>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Referral Link
          </label>
          <div className="flex">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg bg-gray-50 text-sm"
            />
            <CopyToClipboard text={referralLink} onCopy={handleCopy}>
              <button className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700">
                Copy Link
              </button>
            </CopyToClipboard>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Referral rewards are earned only from valid recharges. 
            No guaranteed income. Terms and conditions apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReferralSection;
