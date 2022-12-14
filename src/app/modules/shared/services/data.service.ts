import { BmsInfo } from './../interfaces/bms-info';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, tap, of } from 'rxjs';
import { data } from 'src/app/modules/shared/mock_data'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = "here goes the url";
  data$ = new ReplaySubject<BmsInfo>(1);

  constructor(private http : HttpClient) { }

  getData(){
    return this.data$.asObservable();
  }

  refreshData(){
    return this.http.get<BmsInfo>(this.url)
    .pipe(tap((data)=>{
      this.data$.next(data);
    }))
  }

  refreshMockData(){
    this.data$.next(data);
    return of(data);
  }
}
