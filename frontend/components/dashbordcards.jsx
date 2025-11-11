import React from 'react';

const DashboardCards = ({ userStats }) => {
  const cards = [
    {
      title: 'Left Members',
      value: userStats?.leftCount || 0,
      color: 'bg-blue-500',
      icon: '👥'
    },
    {
      title: 'Right Members',
      value: userStats?.rightCount || 0,
      color: 'bg-green-500',
      icon: '👥'
    },
    {
      title: 'Wallet Balance',
      value: `₹${userStats?.walletBalance || 0}`,
      color: 'bg-purple-500',
      icon: '💰'
    },
    {
      title: 'Total Earnings',
      value: `₹${userStats?.totalEarnings || 0}`,
      color: 'bg-orange-500',
      icon: '📈'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {card.value}
              </p>
            </div>
            <div className={`${card.color} w-12 h-12 rounded-full flex items-center justify-center`}>
              <span className="text-white text-xl">{card.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
