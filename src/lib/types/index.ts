export * from './main-nsp';
export * from './tic-tac-toe-nsp';

export interface ExposableState<T> {
    getState(): T;
}
