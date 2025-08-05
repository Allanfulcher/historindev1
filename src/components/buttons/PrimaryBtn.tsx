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
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded whitespace-nowrap flex-shrink-0 text-sm sm:text-base"
        >
            {children}
        </button>
    );
};

export default PrimaryBtn;
