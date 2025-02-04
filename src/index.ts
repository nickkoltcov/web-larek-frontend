import './scss/styles.scss';
import { ApiRequest } from './components/ApiRequest';
import { DataCardsProuduct } from './components/Model/DataCardsProduct';
import { API_URL, CDN_URL } from './utils/constants';
import { Card } from './components/View/Card';
import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { Page } from './components/View/Page';
import { CardPreview } from './components/View/cardPreview';
import { Modal } from './components/View/Modal';
import { IContactForm, IOrderForm, IPayForm, IProduct } from './types';
import { CartModel } from './components/Model/CartModel';
import { CartView } from './components/View/CartView';
import { CartProduct } from './components/View/cartProduct';
import { FormOrden } from './components/View/FormOrden';
import { FormContact } from './components/View/FormContact';
import { FormModel } from './components/Model/FormModel';
import { Success } from './components/View/Success';




// экземпляры классов 
const events = new EventEmitter(); // экземпляр класса EventEmitter
const cardModel = new DataCardsProuduct(events); // модель карточек 
const cartModel = new CartModel(events);// модель корзины 
const formModel = new FormModel(events);
const api = new ApiRequest(CDN_URL, API_URL); // экземпляр класса ApiModel 

// темплейты карточек 
const cardTemplete = document.querySelector('#card-catalog') as HTMLTemplateElement; //темплейт продукта в каталоге 
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement; //темплейт продукта в превью
const cartTemplete = document.querySelector('#basket') as HTMLTemplateElement;//темплей продукта в корзине 
const cartCardTemplete = document.querySelector('#card-basket') as HTMLTemplateElement;//темплейт корзины 
const formOrdenTemplete = document.querySelector('#order') as HTMLTemplateElement;// темплейт формы способа оплаты и адресса 
const formContactTemplete = document.querySelector('#contacts') as HTMLTemplateElement;// темплейт  формы контактных данных 
const successTemplete = document.querySelector('#success') as HTMLTemplateElement// темплейт выполненого заказа 


const page = new Page(document.body, events)// главная страница 

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events)// модальное окно 


const success = new Success(cloneTemplate(successTemplete), { onClick: () => { modal.close()}});// окно успешного заказа
const cart = new CartView(cloneTemplate(cartTemplete), events);// корзина 
const order = new FormOrden(cloneTemplate(formOrdenTemplete), events)// форма способа оплаты и адресса 
const contacts = new FormContact (cloneTemplate(formContactTemplete), events) // форма контактных данных 

// получения карточек с сервера 
api.getProduct()
  .then(data =>{
    cardModel.setProducts(data);
    console.log(cardModel)
 })
  .catch(error => console.log(error));


// модальное окно открыто тогда на странице отключается прокрутка 
events.on('modal:open', () => {
  page.locked = true;
});
  

  // Модальное окно закрыто тогда на странице прокрутка разрешена 
events.on('modal:close', () => {
  page.locked = false;
});
  

// отображение карточки на странице 
events.on('products:received',() => {
  const productsHTMLArray = cardModel.getproducts().map(item => new Card(cloneTemplate(cardTemplete),{ onClick: () => events.emit('card:select', item) }).render(item));
  page.render({
    productList: productsHTMLArray
  })
})


// выбраная картачка продукта 
events.on('card:select', (item: IProduct) => {
  cardModel.setPreview(item);
});


// превью товара 
events.on('card:preview', (item: IProduct) => {
  const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), {
    onClick: () => {
      if (!cartModel.inBasket(item)) {
        cartModel.setProduct(item);
        cardPreview.updateButtonState(true, item.price);
      }  
    }
  });

  modal.render({
    content: cardPreview.render({
      category: item.category,
      title: item.title,
      image: item.image,
      description: item.description,
      price: item.price,
    })
  });

  cardPreview.updateButtonState(cartModel.inBasket(item),item.price);

});

// открытие модального окна корзины
events.on('cart:open', () => {
  modal.render({ content: cart.render({}) });
});


// корзина с добавляными продуктами 
events.on('cart:updated', (cartProduct:IProduct[]) => {

  page.basketCounter = cartProduct.length;

  cart.cartProducts = cartProduct.map((item,index) => {
      const card = new CartProduct (cloneTemplate(cartCardTemplete), {onClick: () => {
      events.emit('card:delete', item)
    }});

     return card.render({
      index: (index+1).toString(),
      title: item.title,
      price: item.price,
     })
  });

  cart.total = cartModel.totalPrice()

});
 

// удаления товара из  корзины 
events.on('card:delete', (item: IProduct) => {
  cartModel.deleteProductCart(item);
});


// открытия формы способа оплаты и адресса доставки 
events.on('order:open',() => {
  modal.render({
    content: order.render({
      payment: 'online',
      address: '',
      valid: false,
      errors: []
    })
  })
});


// открытия формы контактных данных 
events.on('order:submit',() =>{
  modal.render({
    content: contacts.render({
      phone:'',
      email:'',
      valid: false,
      errors: []
    })
  })
})


// Изменилось состояние валидации формы
events.on('formErrors:change', (errors: Partial<IContactForm>) => {
  const { email, phone } = errors;
  contacts.valid = !email && !phone;
  contacts.errors = Object.values({phone, email}).filter(i => !!i).join('; ');
});

// Изменилось одно из полей
events.on(/^contacts\..*:change/, (data: { field: keyof IContactForm, value: string }) => {
  formModel.setContactField(data.field, data.value);
});

// Изменилось состояние валидации формы
events.on('formErrors:change', (errors: Partial<IPayForm>) => {
  const { payment, address } = errors;
  order.valid = !payment && !address;
  order.errors = Object.values({payment, address}).filter(i => !!i).join('; ');
});

// Изменилось одно из полей
events.on(/^order\..*:change/, (data: { field: keyof IPayForm, value: string }) => {
  formModel.setOrderField(data.field, data.value);
});

// способ оплаты 
events.on('order:paymentUpdated', (paymentData: IOrderForm) => {
  order.paymentMethod = paymentData.payment;
});


// отправка заказа на сервер 
events.on('contacts:submit', () => {
  const total = cartModel.totalPrice();
  const items = cartModel.getItems();

  const order = {
    ...formModel.order, total, items
    
  };
  console.log(order);

  api.orderPost(order)
    .then(data => {
      success.totalprice = data.total.toString(); 
      modal.render({ content: success.render({})});
      cartModel.clearCart()
      formModel.clearForm()
    })
    .catch(err => {
      console.error(err);
    });
});


events.on('form:cleared', () => {
});