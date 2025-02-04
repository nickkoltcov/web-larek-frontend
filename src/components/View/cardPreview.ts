import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";


interface Actions {
    onClick: (event: MouseEvent) => void;
}


export class CardPreview extends Card {
    protected cardDescription: HTMLElement;
    protected cardButton: HTMLButtonElement;

    constructor (container: HTMLElement,actions?: Actions) {
        super(container)
        this.cardDescription = ensureElement(".card__text", this.container);
        this.cardButton = ensureElement(".card__button", this.container) as HTMLButtonElement;

        if (actions?.onClick) { 
            this.cardButton.addEventListener('click', actions.onClick);
        }

    }

    // устанавливаем подробное описания продукта 
    set description(value: string) {
        this.setText(this.cardDescription, value)
    }

    // обновления состояния кнопки и ее текста 
    updateButtonState(productBasket: boolean, price: number): void {
        if (price === null) {
            this.cardButton.textContent = 'Недоступен';
            this.cardButton.disabled = true;
        } else if (productBasket) {
            this.cardButton.textContent = 'Товар в корзине';
            this.cardButton.disabled = true;
        } else {
            this.cardButton.textContent = 'В корзину';
            this.cardButton.disabled = false;
        }
    }
}

