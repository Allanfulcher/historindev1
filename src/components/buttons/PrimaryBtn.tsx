'use client';

interface PrimaryBtnProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({ children, onClick, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="bg-[#8B4513] hover:bg-[#A0522D] text-white py-2 px-4 rounded whitespace-nowrap flex-shrink-0 text-sm sm:text-base transition-colors duration-200"
        >
            {children}
        </button>
    );
};

export default PrimaryBtn;
