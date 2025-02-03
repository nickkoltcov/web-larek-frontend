// интерфейс продукта 

export interface IProduct {
    index?:string;
    id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}




// интерфейс полей формы 

export interface IOrder {
    payment: PayMethod
    address: string;
    email: string;
    phone: string;
    items : string []
    total: number;
}

export interface IOrderForm  {
    payment: PayMethod | null;
    address: string;
    email: string;
    phone: string;
}

export interface IPayForm {
   address:string;
   payment:'online' | 'offline'
}

export interface IContactForm {
    email: string;
    phone: string;
}

export type PayMethod = 'online' | 'offline'

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

export interface IOrderResult {
    id: string;
    total: number;
}


