import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

interface ISuccess {
    total:number
}

interface ISuccessActions {
    onClick: () => void;
}

export class Success extends Component<ISuccess> {
    protected closeButton: HTMLButtonElement;
    protected total:HTMLElement;

    constructor(container:HTMLElement, actions: ISuccessActions){
        super(container)

        this.closeButton = ensureElement('.order-success__close', this.container) as HTMLButtonElement;
        this.total = ensureElement('.order-success__description', this.container);

        if (actions?.onClick) {
            this.closeButton.addEventListener('click', actions.onClick);
        }
    }
    

    set totalprice(value: string) {
        this.total.textContent = `Списано ${value} синапсов`;
    }
}