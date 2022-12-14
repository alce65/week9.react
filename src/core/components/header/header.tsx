import './header.css';

export function Header({ children }: { children: JSX.Element }) {
    const title = 'RoyalBots';

    return (
        <header className="header__main">
            <h1 className="header__title">{title}</h1>
            <div className="robot-menu">{children}</div>
        </header>
    );
}
