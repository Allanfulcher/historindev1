'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface NavigationTabProps {
  activeTab: 'historia' | 'rua' | 'cidade';
  changeTab: (tab: 'historia' | 'rua' | 'cidade') => void;
  className?: string;
}

const NavigationTab = ({ activeTab, changeTab, className = '' }: NavigationTabProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const handleTabClick = (tabId: 'historia' | 'rua' | 'cidade') => {
    // Check if scroll parameter exists
    const shouldScroll = searchParams.get('scroll') === 'true';
    
    if (shouldScroll) {
      // Remove scroll parameter immediately and synchronously update URL
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete('scroll');
      const newUrl = newSearchParams.toString() ? `?${newSearchParams.toString()}` : '';
      
      // Use window.history.replaceState for immediate synchronous URL update
      window.history.replaceState(null, '', window.location.pathname + newUrl);
      
      // Force a re-render by triggering router refresh after URL is updated
      setTimeout(() => {
        changeTab(tabId);
      }, 0);
    } else {
      // No scroll parameter, safe to change tab immediately
      changeTab(tabId);
    }
  };

  const tabItems = [
    { id: 'historia', label: 'História', icon: 'fas fa-book-open', shortLabel: 'História' },
    { id: 'rua', label: 'Rua', icon: 'fas fa-road', shortLabel: 'Rua' },
    { id: 'cidade', label: 'Cidade', icon: 'fas fa-city', shortLabel: 'Cidade' }
  ];

  return (
    <div className={`w-full mb-6 ${className}`}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-[#FEFCF8] rounded-xl shadow-sm ring-1 ring-[#A0958A]/20 p-1">
          <div className="flex gap-1">
            {tabItems.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id as any)}
                  className={`
                    relative flex flex-col sm:flex-row items-center justify-center 
                    px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-lg 
                    transition-all duration-200 min-w-0 flex-1
                    ${isActive 
                      ? 'bg-[#8B4513] text-white shadow-sm' 
                      : 'text-[#6B5B4F] hover:text-[#4A3F35] hover:bg-[#F5F1EB]'
                    }
                    focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:ring-offset-1
                  `}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${tab.id}-panel`}
                  id={`${tab.id}-tab`}
                >
                  <i className={`${tab.icon} text-sm sm:text-xs sm:mr-2 mb-1 sm:mb-0`}></i>
                  <span className="text-xs sm:text-sm leading-tight text-center sm:text-left truncate">
                    {tab.shortLabel}
                  </span>
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