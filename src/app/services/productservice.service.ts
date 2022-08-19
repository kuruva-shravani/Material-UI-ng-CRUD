import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductserviceService {
  product_Url = ' http://localhost:3000/productList/';

  constructor(private Http: HttpClient) {}

  getProduct() {
    return this.Http.get(this.product_Url);
  }

  postProduct(data: any) {
    return this.Http.post<any>(this.product_Url, data);
  }

  putProduct(data: any, id: number) {
    const put_url = this.product_Url + id;
    return this.Http.put<any>(put_url, data);
  }

  deleteProduct(id: number) {
    console.log(id);
    const delete_url = this.product_Url + id;
    return this.Http.delete<any>(delete_url);
  }
}
