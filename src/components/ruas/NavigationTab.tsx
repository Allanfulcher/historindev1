'use client';

interface NavigationTabProps {
  activeTab: 'historia' | 'rua' | 'cidade';
  changeTab: (tab: 'historia' | 'rua' | 'cidade') => void;
  className?: string;
}

const NavigationTab = ({ activeTab, changeTab, className = '' }: NavigationTabProps) => {
  const tabItems = [
    { id: 'historia', label: 'História' },
    { id: 'rua', label: 'Rua' },
    { id: 'cidade', label: 'Cidade' }
  ];

  return (
    <div className={`w-full ${className}`}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex border-b border-[#F5F1EB]">
        {tabItems.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => changeTab(tab.id as any)}
              className={`
                relative px-4 py-3 text-sm font-medium 
                ${isActive 
                  ? 'text-[#8B4513] border-b-2 border-[#8B4513]' 
                  : 'text-[#A0958A] hover:text-[#6B5B4F] hover:bg-[#F5F1EB]'
                }
                focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8B4513]/50 focus-visible:ring-offset-1
                flex-1 text-center whitespace-nowrap transition-colors duration-150
              `}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tab.id}-panel`}
              id={`${tab.id}-tab`}
            >
              {tab.label}
            </button>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default NavigationTab;