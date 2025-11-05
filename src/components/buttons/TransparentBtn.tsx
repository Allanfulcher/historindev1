'use client';

interface TransparentBtnProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

const TransparentBtn: React.FC<TransparentBtnProps> = ({ children, onClick, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="bg-transparent hover:bg-[#F5F1EB] text-[#6B5B4F] p-1 rounded-full flex items-center justify-center text-2xl transition-all duration-300 cursor-pointer transform hover:scale-110 active:scale-95"
        >
            {children}
        </button>
    );
};

export default TransparentBtn;
