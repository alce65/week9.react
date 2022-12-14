import logo from './logo.svg';
import './logo.react.css';

export function LogoReact() {
    const title = 'LogoReact';

    return (
        <div className="logo-react__wrapper">
            <img
                src={logo}
                className="logo-react"
                alt="logo"
                aria-label={title}
            />
        </div>
    );
}
