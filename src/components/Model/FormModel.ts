
import { FormErrors, IContactForm, IOrderForm, IPayForm, PayMethod } from "../../types";
import { IEvents } from "../base/events";



export class FormModel {
  order: IOrderForm = {
    payment: null,
    address: '',
    email: '',
    phone: '',
  }
  formErrors: FormErrors = {};

  constructor(protected events:IEvents){}

  setContactField(field: keyof IContactForm, value: string) {
    this.order[field] = value;

    this.validateContact()
  }

  validateContact() {
    const errors: typeof this.formErrors = {};
    if (!this.order.email) {
      errors.email = 'Необходимо указать email';
    }
    if (!this.order.phone) {
      errors.phone = 'Необходимо указать телефон';
    }
    this.formErrors = errors;
    this.events.emit('formErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }

  setOrderField(field: keyof IPayForm, value: string) {
    if(field === 'payment'){
      this.setPaymethod(value as PayMethod)
    } else {
    this.order[field] = value;
   }
   this.validateOrder()
  }

  setPaymethod(method: PayMethod ) {
    this.order.payment = method
  }

  validateOrder() {
    const errors: typeof this.formErrors = {};
    if (!this.order.payment) {
      errors.payment = 'Необходимо выбрать способ оплаты ';
    }
    if (!this.order.address) {
      errors.address = 'Необходимо указать телефон';
    }
    this.formErrors = errors;
    this.events.emit('formErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }
  
}

