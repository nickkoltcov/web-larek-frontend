import {Api ,ApiListResponse } from "./base/api";
import {IOrder, IOrderResult, IProduct} from "../types"




export class ApiRequest extends Api {
  readonly cdn: string;
  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
      super(baseUrl, options);
      this.cdn = cdn;
  }

  getProduct(): Promise<IProduct[]> {
    return this.get('/product').then((data: ApiListResponse<IProduct>) =>
      data.items.map((item) => ({
        ...item,
        image: this.cdn + item.image,
      }))
    );
  }

  orderPost(order: IOrder): Promise<IOrderResult> {
    return this.post('/order', order).then(
      (data: IOrderResult) => data
    );
  }
}