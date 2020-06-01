import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  public getServerStats(){
    return this.http.get('https://skirata.pro/API/server_stats');
  }

  public getSaberEloLevel(){
    return this.http.get('https://skirata.pro/API/saber_elo_level');
  }

  public getFFEloLevel(){
    return this.http.get('https://skirata.pro/API/ff_elo_level');
  }

}
