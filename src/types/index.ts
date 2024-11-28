interface IProduct {
    id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

interface IOrden {
    payment: string;
    address: string;
    email: string;
    phone: number;
    total: number;
    items: string;
}