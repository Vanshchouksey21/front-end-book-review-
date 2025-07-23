import React from 'react';

function Footer() {
    return (
        <footer style={{ backgroundColor: '#4A6CF7' }} className="text-light py-4  shadow-sm">
            <div className="container text-center">
                <div className="mb-2">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-decoration-none me-3"
                        style={{ color: '#D5E6FB' }}
                    >
                        GitHub
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-decoration-none me-3"
                        style={{ color: '#D5E6FB' }}
                    >
                        LinkedIn
                    </a>
                    <a
                        href="mailto:support@bookverse.com"
                        className="text-decoration-none"
                        style={{ color: '#D5E6FB' }}
                    >
                        Contact Us
                    </a>
                </div>
                <small style={{ color: '#D5E6FB' }}>
                    © {new Date().getFullYear()} <strong>BookVerse</strong> — All rights reserved.
                </small>
            </div>
        </footer>
    );
}

export default Footer;
