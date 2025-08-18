'use client';

interface BrownBtnProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

const BrownBtn: React.FC<BrownBtnProps> = ({ children, onClick, disabled }) => {
    return (
        <button
        onClick={onClick}
        disabled={disabled}
        className="px-4 py-3 hover:bg-[#F5F1EB] rounded-md text-lg font-semibold text-[#6B5B4F] transition-colors duration-200 text-left border-b border-[#F5F1EB]"
      >
        {children}
      </button>
    );
};

export default BrownBtn;
