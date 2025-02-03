import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";


const cardCategoryColor:{[key: string]: string} = {
    "кнопка": "card__category_button",
    "другое": "card__category_other",
    "софт-скил": "card__category_soft",
    "дополнительное": "card__category_additional",
    "хард-скил": "card__category_hard"
}

interface Actions {
    onClick: (event: MouseEvent) => void;
}

export class Card extends Component<IProduct> {
    protected cardCategory: HTMLElement;
    protected cardTitle: HTMLElement;
    protected cardImg: HTMLImageElement;
    protected cardPrice: HTMLElement;
    protected cardId: string;


    constructor(container:HTMLElement, actions?: Actions) {
        super(container);
        this.cardCategory = container.querySelector('.card__category');
        this.cardTitle = ensureElement('.card__title', this.container);
        this.cardImg = container.querySelector('.card__image');
        this.cardPrice = ensureElement('.card__price', this.container);

        if (actions?.onClick) { 
            container.addEventListener('click', actions.onClick);
        }
    }

    
    // устанавливаем категорию 
    set category(value:string) {
        this.setText(this.cardCategory, value);
        this.cardCategory.classList.add(cardCategoryColor[value])
    }

    // устанавливаем текст 
    set title(value:string) {
        this.setText(this.cardTitle, value);
    }

    // устанавливаем картинку 
    set image(value:string) {
        this.setImage(this.cardImg, value);
    }


    // устанавливаем цену 
    set price(value:number | null) {
        const price = value || 0;
        this.setText(this.cardPrice, `${price} синапсов`);
    }

    // устанавливаем id продукта 
    set id (value:string) {
       this.cardId = value;
    }

    
}
