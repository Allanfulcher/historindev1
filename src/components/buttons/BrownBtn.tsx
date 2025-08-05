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
        className="px-4 py-3 hover:bg-amber-100 rounded-md text-lg font-semibold text-amber-900 transition-colors duration-200 text-left border-b border-amber-50"
      >
        {children}
      </button>
    );
};

export default BrownBtn;
