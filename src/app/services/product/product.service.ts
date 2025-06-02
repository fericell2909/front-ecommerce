import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ProductResponse } from '../../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getProducts(page: number, pageSize: number, search: string =''): Observable<ProductResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('rows', pageSize);

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<ProductResponse>(environment.apiUrl + '/shop/product/list', { params })
      .pipe(
        map((response: any) => ({
          data: response.data,
          links: response.links,
          meta: response.meta
        }))
      );
  }
}
