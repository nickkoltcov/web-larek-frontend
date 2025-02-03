import { createElement, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface ICart {
    cartProducts: HTMLElement[];
    totalNumber: number;
}

export class CartView extends Component<ICart> {
    protected designButton: HTMLButtonElement;// кнопка оформить 
    protected totalPrice:HTMLElement;//общая цена продуктов  
    protected cartList:HTMLElement;// список товаров в корзине 

    constructor(container:HTMLElement, protected events:IEvents) {
        super(container)

        this.cartList = ensureElement('.basket__list', this.container);
        this.totalPrice = ensureElement('.basket__price', this.container);
        this.designButton = ensureElement('.basket__button', this.container) as HTMLButtonElement;


        this.cartProducts = []


        if (this.designButton) {
            this.designButton.addEventListener('click', () => {
                events.emit('order:open');
            });
        }

    }

    // устанавливаем товар в лист корзины или если она пустая устанавливаем текст что корзина пуста и блокируем кнопку если цена корзины = 0
    set cartProducts(cartProducts: HTMLElement[]) {
        if (cartProducts.length) {
            this.cartList.replaceChildren(...cartProducts);
        } else {
            this.cartList.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
        }

        this.designButton.disabled = cartProducts.length === 0;
    }

    
    // устанавливаем общую цену 
    set total (value:number) {
        this.setText(this.totalPrice, `${value} синапсов`)
    }

    
}