// интерфейс продукта 

interface IProduct {
    id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

// интерфейс полей формы 

interface IOrden {
    payment: string;
    address: string;
    email: string;
    phone: number;
    total: number;
    items: string;
}


// данные продукта которые используется в детальном осмотре продукта 

type TCard = Pick<IProduct, 'description'| 'image' | 'category' | 'title' |'price'>;

// данные которые используется в форме выбора оплаты и адреса доставки 
type TFormPaymethodAddress = Pick<IOrden, 'payment' | 'address' >;

// данные которые используется в форме заполнения номера телефона и эмаила 
type TFormContact = Pick<IOrden, 'email' | 'phone'>;

// данные которые будут использованы в корзине 
type TCurt = Pick<IProduct, 'id' | 'title' | 'price'>;