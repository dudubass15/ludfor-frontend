export interface ResponseInterface<T> {
    data: T;
    success: boolean;
    error?: string;
}
