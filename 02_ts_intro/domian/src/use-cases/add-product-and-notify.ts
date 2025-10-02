import type { CategoryService } from "../service/category-service.js";
import type { EmailService } from "../service/email-service.js";
import type { ProductService } from "../service/product-service.js";
import type { UserService } from "../service/user-service.js";

export interface AddProductAndNotifyDeps {
    productService: ProductService;
    emailService: EmailService;
    userService: UserService;
    categoryService: CategoryService;
}

export interface AddProductAndNotifyPayload {
    name: string;
    price: number;
    categoryId: string;
}

export async function addProductAndNotify(
    { productService, emailService, userService, categoryService }: AddProductAndNotifyDeps,
    { name, price, categoryId }: AddProductAndNotifyPayload
) {
    const category = await categoryService.findById(categoryId);
    if (!category) {
        throw new Error("Categoria no encontrada");
    }

    await productService.save({
        id: crypto.randomUUID(),
        name,
        price,
        categoryId
    });

    const allUsers = await userService.findAll();

    await emailService.notifyNewProduct(
        name,
        allUsers.map((user) => user.email)
    );
}
