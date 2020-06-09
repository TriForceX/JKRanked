import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { 
    //setInterval(() => 
    //  {
    //    this.getServerStatsSA()
    //    this.getSaberEloLevelSA()
    //    this.getFFEloLevelSA()
    //    this.getLastSaberDuelsSA()
    //    this.getLastFullForceDuelsSA()
    //    console.log("reloaded")
    //  }
    //, 5000);
  }

  public getServerStatsSA(){
    return this.http.get('https://jkranked.com/API/server_stats');
  }

  public getFFAwlRatioSA(){
    return this.http.get('https://jkranked.com/API/ffa_wl_ratio');
  }

  public getSaberEloLevelSA(){
    return this.http.get('https://jkranked.com/API/saber_elo_level');
  }

  public getFFEloLevelSA(){
    return this.http.get('https://jkranked.com/API/ff_elo_level');
  }

  public getLastSaberDuelsSA(){
    return this.http.get('https://jkranked.com/API/last_saber_duels');
  }

  public getLastFullForceDuelsSA(){
    return this.http.get('https://jkranked.com/API/last_full_force_duels');
  }





  public getServerStatsNA(){
    return this.http.get('https://na.jkranked.com/API/server_stats');
  }

  public getFFAwlRatioNA(){
    return this.http.get('https://na.jkranked.com/API/ffa_wl_ratio');
  }

  public getSaberEloLevelNA(){
    return this.http.get('https://na.jkranked.com/API/saber_elo_level');
  }

  public getFFEloLevelNA(){
    return this.http.get('https://na.jkranked.com/API/ff_elo_level');
  }

  



  public getServerStatsEU(){
    return this.http.get('https://eu.jkranked.com/API/server_stats');
  }

  public getFFAwlRatioEU(){
    return this.http.get('https://eu.jkranked.com/API/ffa_wl_ratio');
  }

  public getSaberEloLevelEU(){
    return this.http.get('https://eu.jkranked.com/API/saber_elo_level');
  }

  public getFFEloLevelEU(){
    return this.http.get('https://eu.jkranked.com/API/ff_elo_level');
  }

}
