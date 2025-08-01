// Header Component - Top header with logo, quiz, share, feedback, and menu buttons
// Extracted from monolithic HTML and converted to React.createElement syntax

const Header = ({ setMenuOpen, setShowFeedback }) => {
    const [showQuiz, setShowQuiz] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [emailSubmitted, setEmailSubmitted] = React.useState(false);
    const [quizStarted, setQuizStarted] = React.useState(false);

    // Share function
    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: 'Historin - Histórias de Gramado',
                    text: 'Descubra as histórias de Gramado através do Historin!',
                    url: window.location.href,
                })
                .catch((error) => console.error('Erro ao compartilhar:', error));
        } else {
            alert('Compartilhamento não suportado neste navegador.');
        }
    };

    const buttonStyle = 'px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600';

    return React.createElement('header', { 
        className: 'flex justify-between items-center p-4 bg-[#E6D3B4]' 
    },
        // Logo section
        React.createElement('div', { className: 'flex items-center' },
            React.createElement(window.ReactRouterDOM.Link, {
                to: '/',
                className: 'mr-2'
            },
                React.createElement('img', {
                    src: 'fotos/historin-logo.svg',
                    alt: 'HISTORIN Logo',
                    className: 'text-2xl font-bold logo'
                })
            )
        ),
        
        // Buttons section
        React.createElement('div', { className: 'flex items-center space-x-4' },
            // Quiz button
            React.createElement('button', {
                onClick: () => setShowQuiz(true),
                className: `${buttonStyle} flex items-center`
            },
                React.createElement('i', { className: 'fas fa-question-circle mr-2' }),
                'Quiz'
            ),
            
            // Quiz Modal (conditionally rendered)
            showQuiz && window.QuizModal ? React.createElement(window.QuizModal, {
                isOpen: showQuiz,
                onClose: () => setShowQuiz(false),
                email: email,
                setEmail: setEmail,
                emailSubmitted: emailSubmitted,
                setEmailSubmitted: setEmailSubmitted,
                quizStarted: quizStarted,
                setQuizStarted: setQuizStarted
            }) : null,
            
            // Share button
            React.createElement('button', {
                onClick: handleShare,
                'aria-label': 'Compartilhar',
                className: 'text-2xl pr-2 hover:text-blue-600'
            },
                React.createElement('i', { className: 'fas fa-share-alt' })
            ),
            
            // Feedback button
            React.createElement('button', {
                onClick: () => setShowFeedback(true),
                'aria-label': 'Feedback',
                className: 'text-2xl pr-2 hover:text-blue-600'
            },
                React.createElement('i', { className: 'fas fa-comment-dots' })
            ),
            
            // Menu button
            React.createElement('div', {
                className: 'text-2xl cursor-pointer hover:text-blue-600',
                onClick: () => setMenuOpen(true)
            },
                React.createElement('i', { className: 'fas fa-bars' })
            )
        )
    );
};

// Export to global window object for legacy compatibility
if (typeof window !== 'undefined') {
    window.Header = Header;
}

// Also support ES6 module export for modern usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Header;
}
