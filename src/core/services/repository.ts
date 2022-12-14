export interface Repository<T> {
    getAll: () => Promise<Array<T>>;
    get?: (id: string) => Promise<T>;
    create: (item: Partial<T>) => Promise<T>;
    update: (item: Partial<T>) => Promise<T>;
    delete: (id: string) => Promise<void>;
}

// User & Token & Robot
export interface RepositoryUser<U, T, R> {
    //getAll: () => Promise<Array<T>>;
    //get?: (id: string) => Promise<T>;
    //create: (item: Partial<T>) => Promise<T>;
    login: (user: Partial<U>) => Promise<{ token: T; fullUser: U }>;
    register: (user: Partial<U>) => Promise<U>;
    addFavorites: (item: Partial<R>) => Promise<U>;
    deleteFavorites: (item: Partial<R>) => Promise<U>;
    //delete: (id: string) => Promise<void>;
}
