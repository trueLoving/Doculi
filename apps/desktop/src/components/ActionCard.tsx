import React from 'react';

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, description, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all hover:scale-105 text-left w-full"
    >
      <div className="flex flex-col items-center text-center">
        <div className="text-gray-300 text-5xl mb-4">{icon}</div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </button>
  );
};

export default ActionCard;

