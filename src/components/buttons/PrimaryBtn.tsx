'use client';

interface PrimaryBtnProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({ children, onClick, disabled }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className="bg-[#8B4513] hover:bg-[#A0522D] text-white py-2 px-4 rounded whitespace-nowrap flex-shrink-0 text-sm sm:text-base transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-xl"
        >
            {children}
        </button>
    );
};

export default PrimaryBtn;
