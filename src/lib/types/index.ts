export * from './main-nsp';
export * from './tic-tac-toe-nsp';

export interface ExposableFields<T> {
    getFields(): T;
}
