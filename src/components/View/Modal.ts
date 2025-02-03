import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";


interface IModal {
    content: HTMLElement;
}

export class Modal extends Component<IModal> {
    protected closeButton: HTMLButtonElement;
    protected contentElement: HTMLElement;

    constructor(container: HTMLElement, protected events:IEvents) {
        super(container);
        this.closeButton = ensureElement('.modal__close', this.container) as HTMLButtonElement;
        this.contentElement = ensureElement('.modal__content', this.container);

        this.closeButton.addEventListener('click', this.close.bind(this));
        this.container.addEventListener('click', this.close.bind(this));
        this.contentElement.addEventListener('click', (event) => event.stopPropagation());

    }

    // устанавливаем содержания модального окна 
    set content (value: HTMLElement) {
        this.contentElement.replaceChildren(value)
    }


    // открытое модальное окно 
    open() {
        this.container.classList.add('modal_active');
        this.events.emit('modal:open');
    }

    // закрытое модальное окно 
    close() {
        this.container.classList.remove('modal_active');
        this.content = null;
        this.events.emit('modal:close');
    }


    
    render(data: IModal): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}