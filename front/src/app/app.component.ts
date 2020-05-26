import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Skirata.PRO';
  saber_elo_level:any;
  full_force_elo_level:any;
  server_stats:any;

  constructor(
    private http: HttpClient 
  ){}

  ngOnInit() {
    this.http.get('https://skirata.pro/API/saber_elo_level').subscribe(
      data => {
        this.saber_elo_level = data;
        this.saber_elo_level = this.saber_elo_level.data;
        
        }
      );

      this.http.get('https://skirata.pro/API/ff_elo_level').subscribe(
        data => {
          this.full_force_elo_level = data;
          this.full_force_elo_level = this.full_force_elo_level.data;
          
          }
        );

        this.http.get('https://skirata.pro/API/server_stats').subscribe(
          data => {
            this.server_stats = data;
            this.server_stats = this.server_stats.data[0];
            console.log(this.server_stats);
            }
          );
  }

  colorPlayer(name){
    let color_name = '';
    color_name = '<span class="white_name">'+name+'</span>';
    color_name = color_name.replace(/\^0/g,'</span><span class="black_name">'); //Black
    color_name = color_name.replace(/\^1/g,'</span><span class="red_name">'); //Red
    color_name = color_name.replace(/\^2/g,'</span><span class="green_name">'); //Green
    color_name = color_name.replace(/\^3/g,'</span><span class="yellow_name">'); //Yellow
    color_name = color_name.replace(/\^4/g,'</span><span class="blue_name">'); //Blue
    color_name = color_name.replace(/\^5/g,'</span><span class="cyan_name">'); //cyan
    color_name = color_name.replace(/\^6/g,'</span><span class="magenta_name">'); //Magenta
    color_name = color_name.replace(/\^7/g,'</span><span class="white_name">'); //white

    return color_name;
  }

  getLevel(XP){
    let constA = 8.7;
    let constB = -40
    let constC = 111
    return Math.max( Math.floor( constA * Math.log( XP + constC ) + constB ), 1 )
  }

  getLeague(elo){
    let league = '';
    if(elo <= 1199){
      league = '<span class="badge badge-danger">Bronze</span>';
    }else if(elo >= 1200 && elo <= 1299){
      league = '<span class="badge badge-info">Silver</span>';
    }else if(elo >= 1300 && elo <= 1399){
      league = '<span class="badge badge-quaternary">Gold</span>';
    }else if(elo >= 1400 && elo <= 1499){
      league = '<span class="badge badge-tertiary">Platinum</span>';
    }else if(elo >= 1500){
      league = '<span class="badge badge-secondary">Diamond</span>';
    }
    return league;
  }
}
