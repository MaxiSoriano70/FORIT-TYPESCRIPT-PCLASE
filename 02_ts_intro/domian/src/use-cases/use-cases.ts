import { getProductList } from "./products/get-product-list.js";
import { getProduct } from "./products/get-product.js";

export type UseCase<P = any, D = any, R = unknown> = (
    desp: D,
    playload: P => Promise<R>;
)

export interface UseCaseDeclaration{
    useCase: UseCase;
    enable?: boolean;
}

export const domainUseCases = {
    getProductList: {
        useCase: getProductList,
        enable: true
    },
    getProduct: {
        useCase: getProduct,
        enable: true
    }
} as const satisfies Record<string, UseCaseDeclaration>;

export const USE_CASE_NAME = Object.keys(domainUseCases).reduce((acc, key) => {
    acc[key] = key;
    return acc;
}, {} as Record<string, string>) as Record<
    keyof typeof domainUseCases,
    keyof typeof domainUseCases
>;

export type UseCaseName = (typeof USE_CASE_NAME)[keyof typeof USE_CASE_NAME];

export type UseCaseType<TEndpoint extends UseCaseName> =
    (typeof domainUseCases)[TEndpoint]["useCase"];