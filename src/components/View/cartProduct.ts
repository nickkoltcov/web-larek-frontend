import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";


interface Actions {
    onClick: (event: MouseEvent) => void;
}


export class CartProduct extends Card {

    protected cartIndex: HTMLElement;
    protected deleteButton: HTMLButtonElement;


    constructor( container:HTMLElement, actions?: Actions) {
        super(container)

        this.cartIndex = ensureElement('.basket__item-index', this.container)
        this.deleteButton = ensureElement('.basket__item-delete', this.container) as HTMLButtonElement


        if (actions?.onClick) { 
            this.deleteButton.addEventListener('click', actions.onClick);
        }


    }

    // устанавливаем порядковый номер в корзине 
     set index(value:string) {
        this.cartIndex.textContent = value;
     }


}