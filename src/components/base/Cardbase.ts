import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";



export class CardBase extends Component<IProduct> {
    protected cardTitle: HTMLElement;
    protected cardPrice: HTMLElement;
    protected cardId: string;


    constructor(container:HTMLElement) {
        super(container);
        this.cardTitle = ensureElement('.card__title', this.container);
        this.cardPrice = ensureElement('.card__price', this.container);

    }


    // устанавливаем текст 
    set title(value:string) {
        this.setText(this.cardTitle, value);
    }


    // устанавливаем цену 
    set price(value: number | null) {
        if (value === 0 || value === null) {
            this.setText(this.cardPrice, 'Бесценно');
        } else {
            this.setText(this.cardPrice, `${value} синапсов`);
        }
    }

    // устанавливаем id продукта 
    set id (value:string) {
       this.cardId = value;
    }

    
}