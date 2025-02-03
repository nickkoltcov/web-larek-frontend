import { IEvents } from "../base/events";
import { IProduct } from "../../types";



export class DataCardsProuduct {
    protected productcards: IProduct[] = [];
    protected preview: IProduct;

    constructor(protected events: IEvents){}

    // получаем и сохраняем массив в поле класса 

    setProducts(productCards: IProduct[]) {
        this.productcards = productCards;
        this.events.emit('products:received')
    }

    //возвращает массив продуктов
    getproducts(): IProduct[] { 
        return this.productcards;
    } 


    // подробный просмотр карточки
    setPreview(item: IProduct) {
        this.preview = item;
        this.events.emit('card:preview', this.preview)
    }
}