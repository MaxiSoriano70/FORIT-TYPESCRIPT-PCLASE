import type { ProductService } from "../service/product-service.js";
import type { UserService } from "../service/user-service.js";

export interface APDeps{
    pService: ProductService;
    eService: { senp: (n: string, e: string[]) => Promise<void>}
    uS: UserService;
}

export interface Payload{
    n: string;
    p: number;
}

export async function Product(
    { pService, eService, uS }: APDeps,
    { n, p }: Payload
) {
    await pService.save({ id: crypto.randomUUID(), name: n, price: p})

    const allU = await uS.findAll();

    await eService.senp(
        n,
        allU.map((u) => u.email)
    );
}