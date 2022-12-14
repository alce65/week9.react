import './button.css';
export function Button({ children }: { children: JSX.Element }) {
    return <div className="button">{children}</div>;
}
