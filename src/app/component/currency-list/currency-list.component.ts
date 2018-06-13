import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyService} from '../../service/currency.service';
import {Currencies, Currency} from '../../class/currencies';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  currencies: Currencies;
  currenciesList: Currency[] = [];
  pageSize = 10;
  pageSizeValues = [10, 50, 100];
  currentPage = 1;
  filterValue: string;
  maxSize = 15;
  isLoading = true ;
  total = 0;



  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit() {
    this.getCurrencies();
    if (this.detectmob()) {
      this.maxSize = 3;
    }
  }

  changePage(event): void {
    this.getCurrencies();
  }

  chosePageSize(pageSize): void {
    this.pageSize = pageSize;
    this.getCurrencies();
  }

  choseFilterValue(value): void {
    this.filterValue = value;
    this.getCurrencies();
  }

  getCurrencies(): void {
    this.subscription = this.currencyService.getCurrencies(this.pageSize, this.currentPage, this.filterValue)
      .subscribe(currencies => {
        this.currencies = currencies;
        this.currenciesList = currencies.data;
        this.total = currencies.meta.total;
        this.isLoading = false;
      });
  }

  detectmob(): boolean {
    if ( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
