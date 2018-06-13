import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs/index';
import {Currencies} from '../class/currencies';
import {HttpClient} from '@angular/common/http';
import {CurrencyDetail} from '../class/currency-detail';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private url = 'https://api.openfintech.io/v1/currencies';

  constructor(
    private  http: HttpClient
  ) {}

  getCurrencies(pageSize: number, currenctPage: number, searchCondition: string): Observable<Currencies> {

    let queryObject = new HttpParams();
    if (pageSize) {
      queryObject = queryObject.append('page[size]', pageSize.toString());
    }
    if (currenctPage) {
      queryObject = queryObject.append('page[number]', currenctPage.toString());
    }

    if (searchCondition) {
      queryObject = queryObject.append('filter[search]', searchCondition);
    }
    return this.http.get<Currencies>(this.url, {
      params: queryObject
    });
  }

  getCurrency(id: string): Observable<CurrencyDetail> {
    const getCurrencyUrl = `${this.url}/${id}`;
    return this.http.get<CurrencyDetail>(getCurrencyUrl);
  }
}
