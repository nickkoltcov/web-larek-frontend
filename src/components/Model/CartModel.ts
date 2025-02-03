import { IProduct } from "../../types";
import { IEvents } from "../base/events";



export class CartModel {

    protected cartCatalog: IProduct[] = [];


    constructor(protected events:IEvents) {}

    //сохраняем выбрнаый продукт в поле cartCatalog
    setProduct(item:IProduct) {
        this.cartCatalog = [...this.cartCatalog, item]
        this.events.emit('cart:updated', this.cartCatalog)
    }

    // получаем товары в корзине 
    getProductsCart(): IProduct[] {
        return  this.cartCatalog
    }


    // удаляем выбраный продукт по его id 
    deleteProductCart(item:IProduct) {
        this.cartCatalog = this.cartCatalog.filter(cardItem => cardItem.id !== item.id)
        this.events.emit('cart:updated', this.cartCatalog)
    }

    // считаем общую сумму всех продуктов 
    totalPrice(): number {
        return this.cartCatalog.reduce((total, item) => total + item.price, 0);
    }

    // получаем id продуктов в корзине 
    getItems(){
        return this.cartCatalog.map(item => item.id)
    }


    
    // проверяем находиться товар в корзине или нет 
    inBasket(item: IProduct): boolean {
        return this.cartCatalog.some(cartItem => cartItem.id === item.id);
    }

    
    clearCart() {
        this.cartCatalog = []; 
        this.events.emit('cart:updated', this.cartCatalog);
    }
}