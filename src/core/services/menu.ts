import { MenuItems } from '../types/menu.item';

export const getMenuItems = (isLogged: boolean) => {
    const items: MenuItems = [
        { path: '/home', label: 'Inicio', private: false },
        { path: '/favorites', label: 'Favoritos', private: true },
    ];
    if (isLogged) {
        items.push({ path: '/logout', label: 'Logout', private: true });
    } else {
        items.push({ path: '/user', label: 'Login/Register', private: false });
    }

    return items;
};
