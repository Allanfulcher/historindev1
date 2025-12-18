'use client'

const Footer = () => {
    return (
        <footer className="hidden md:block fixed bottom-0 left-0 right-0 bg-[#4A3F35] text-[#F5F1EB] text-center py-3 text-sm z-10 shadow-lg">
            <p className="flex items-center justify-center gap-2">
                <i className="fas fa-mobile-alt"></i>
                <span>Para a melhor experiência, acesse pelo celular</span>
            </p>
        </footer>
    );
};

export default Footer;