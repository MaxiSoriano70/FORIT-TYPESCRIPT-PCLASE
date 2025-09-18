interface Item {
    id: string;
    price: number;
    quantity: number;
}

interface Order {
    items: Item[];
    discount: boolean;
    email: string;
}

const DISCOUNT_RATE = 0.1;

function calculateOrderTotal(order: Order): number {
    let total = calculateOrdeTotal(order);
    total = calculateDiscount(order, total);

    console.log(notifyClient(order.email));

    return total;
}

function calculateOrdeTotal(order: Order): number{
    const total = order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    return total;
}

function calculateDiscount(order: Order, total: number): number{
    let totalDiscount: number;
    if(order.discount){
        totalDiscount = total * (1 - DISCOUNT_RATE)
        return totalDiscount;
    }
    return total;
}

function notifyClient(email: string): void {
    console.log(`Enviando correo a ${email}`);
}

const order: Order = {
    items: [
        { id:"1", price: 100, quantity: 2 },
        { id:"2", price: 50, quantity: 1 }
    ],
    discount: true,
    email: "cliente@correo.com"
};

const total = calculateOrderTotal(order);

console.log("Total:", total);
