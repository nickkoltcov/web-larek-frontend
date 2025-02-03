import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";



interface IPage{
	productList: HTMLElement[];
	CartCounter: number;
	locked: boolean;
}

export class Page extends Component<IPage> {
	protected productContener: HTMLElement;// контейнер для карточек 
	protected elementbasketCounter: HTMLElement;// счетчик товаров в корзине 
	protected cartButton: HTMLButtonElement;// кнопка корзины
	protected pege: HTMLElement;// обертка страницы 


	constructor(container: HTMLElement, evenst:IEvents) {
		super(container);
		this.productContener = ensureElement('.gallery', this.container);
		this.elementbasketCounter = ensureElement('.header__basket-counter', this.container);
		this.pege = ensureElement('.page__wrapper', this.container);
		this.cartButton = ensureElement('.header__basket', this.container) as HTMLButtonElement;

		
		this.cartButton.addEventListener('click',()=> evenst.emit('cart:open'))
	}


	// устанавливаем содержания галереи продуктов 
	set productList(products: HTMLElement[]) {
		this.productContener.replaceChildren(...products);
	}

	// устанавливаем количество товаров в корзине 
	set basketCounter(value: number) {
		this.setText(this.elementbasketCounter, value.toString());
	}

	// управляем блокировкой страницы при открытом модальном окне 
	set locked(value: boolean) {
        if (value) {
            this.pege.classList.add('page__wrapper_locked');
        } else {
            this.pege.classList.remove('page__wrapper_locked');
        }
    }
}
