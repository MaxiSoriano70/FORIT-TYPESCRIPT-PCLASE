import type { ProductService } from "../../service/product-service.js";
import type { UserService } from "../../service/user-service.js";

export interface GetProductListDesp {
    productoService: ProductService;
    userService: UserService;
}

export async function getProductList( deps: GetProductListDesp){
    deps.userService.findAll();
    return await deps.productoService.getProductsWhithDescount();
}