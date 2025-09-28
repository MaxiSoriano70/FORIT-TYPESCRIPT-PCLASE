export interface EmailService{
    notifyNewProduct: (name: string, email: string[]) => Promise<void>
}