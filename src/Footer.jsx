import React from 'react';

function Footer() {
    return (
        <footer className="bg-dark text-light py-3 mt-5">
            <div className="container text-center">
                <small>© {new Date().getFullYear()} BookVerse. All rights reserved.</small>
            </div>
        </footer>
    );
}

export default Footer;
