import { ensureElement } from "../../utils/utils";
import { CardBase } from "../base/Cardbase";


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

export class Card extends CardBase {
    protected cardCategory: HTMLElement;
    protected cardImg: HTMLImageElement;
    protected cardId: string;


    constructor(container:HTMLElement, actions?: Actions) {
        super(container);
        this.cardCategory = ensureElement('.card__category', this.container) ;
        this.cardImg = ensureElement('.card__image', this.container) as HTMLImageElement;

        if (actions?.onClick) { 
            container.addEventListener('click', actions.onClick);
        }
    }

    
    // устанавливаем категорию 
    set category(value:string) {
        this.setText(this.cardCategory, value);
        this.cardCategory.classList.add(cardCategoryColor[value])
    }


    // устанавливаем картинку 
    set image(value:string) {
        this.setImage(this.cardImg, value);
    }

    
}
