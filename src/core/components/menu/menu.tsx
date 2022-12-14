import { Link } from 'react-router-dom';
import { useUsers } from '../../../features/users/hooks/use.users';
import { MenuItems, MenuItem } from '../../types/menu.item';

import './menu.css';

export function Menu({ items }: { items: MenuItems }) {
    const { logState } = useUsers();

    return (
        <nav className="robot-menu">
            <ul className="robot-menu__list-items">
                {items.map(
                    (item: MenuItem) =>
                        (!item.private || logState().isLogged) && (
                            <li key={item.label} className="robot-menu__item">
                                <Link
                                    to={item.path}
                                    className="robot-menu__link"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        )
                )}
            </ul>
        </nav>
    );
}
