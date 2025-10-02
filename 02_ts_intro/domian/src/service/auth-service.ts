export interface AuthService{
    login: (email: string) => Promise<void>;
}