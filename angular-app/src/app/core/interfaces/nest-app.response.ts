export interface ResponseNestApp<T> {
    data: T;
    isArray: boolean;
    path: string;
    duration: string;
    method: string;
}
