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
            className="bg-transparent hover:bg-amber-100 text-amber-900 p-1 rounded-full flex items-center justify-center text-2xl transition-colors duration-200"
        >
            {children}
        </button>
    );
};

export default TransparentBtn;
