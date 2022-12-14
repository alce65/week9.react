import { LogoReact } from '../logo.react/logo.react';
import './footer.css';
export function Footer() {
    const author = 'Alejandro Cerezo';
    const brand = 'ISDI Coders';
    return (
        <footer className="footer">
            <div className="footer__info">
                <address>
                    {author} - {brand}
                </address>
                <p>{new Date().toLocaleDateString()}</p>
            </div>
            <div className="footer__logo">
                <LogoReact></LogoReact>
            </div>
        </footer>
    );
}
