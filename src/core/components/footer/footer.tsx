import './footer.css';
export function Footer() {
    const author = 'Alejandro Cerezo';
    const brand = 'ISDI Coders';
    return (
        <footer>
            <address>
                {author} - {brand}
            </address>
            <p>{new Date().toLocaleDateString()}</p>
        </footer>
    );
}
