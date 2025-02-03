import { IPayForm } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "../Form";




export class FormOrden extends Form<IPayForm> {
    protected payCard: HTMLButtonElement;
    protected payCash: HTMLButtonElement;

    constructor(container: HTMLFormElement, events:IEvents) {
        super(container,events)


        this.payCard = ensureElement('.button_alt[name = card',this.container) as HTMLButtonElement;
        this.payCash = ensureElement('.button_alt[name = cash]',this.container) as HTMLButtonElement;

        this.payCard.addEventListener('click', () => {
            this.paymentMethod = 'online';
			this.onInputChange('payment', 'online');
        })

        this.payCash.addEventListener('click', () => {
            this.paymentMethod = 'offline';
			this.onInputChange('payment', 'offline');
        })
    }

    
    set paymentMethod(value:string) {
        this.payCard.classList.toggle('button_alt-active',value === 'online');
        this.payCash.classList.toggle('button_alt-active',value === 'offline');
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }
}