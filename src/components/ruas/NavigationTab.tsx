'use client';

interface NavigationTabProps {
  activeTab: 'historia' | 'rua' | 'cidade';
  changeTab: (tab: 'historia' | 'rua' | 'cidade') => void;
  className?: string;
}

const NavigationTab = ({ activeTab, changeTab, className = '' }: NavigationTabProps) => {
  const tabItems = [
    { id: 'historia', label: 'História', icon: 'fas fa-book-open' },
    { id: 'rua', label: 'Rua', icon: 'fas fa-road' },
    { id: 'cidade', label: 'Cidade', icon: 'fas fa-city' }
  ];

  return (
    <div className={`w-full mb-6 ${className}`}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-[#FEFCF8] rounded-xl shadow-sm ring-1 ring-[#A0958A]/20 p-1">
          <div className="flex">
            {tabItems.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => changeTab(tab.id as any)}
                  className={`
                    relative flex items-center justify-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-[#8B4513] text-white shadow-sm' 
                      : 'text-[#6B5B4F] hover:text-[#4A3F35] hover:bg-[#F5F1EB]'
                    }
                    focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:ring-offset-1
                    flex-1 whitespace-nowrap
                  `}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${tab.id}-panel`}
                  id={`${tab.id}-tab`}
                >
                  <i className={`${tab.icon} mr-2 text-xs`}></i>
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.charAt(0)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationTab;