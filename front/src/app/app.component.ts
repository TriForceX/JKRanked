import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
//declare function datatables(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Skirata.PRO';
  ffa_wl_ratio:any;
  saber_elo_level:any;
  full_force_elo_level:any;
  server_stats:any = null;

  constructor(
    private dataService: DataService
  ){}

  ngOnInit() {
    

    this.dataService.getServerStats().subscribe((data: any[])=>{
      this.server_stats = data;
      this.server_stats = this.server_stats.data[0];
    })  

    this.dataService.getFFAwlRatio().subscribe((data: any[])=>{
      this.ffa_wl_ratio = data;
      this.ffa_wl_ratio = this.ffa_wl_ratio.data;
    })  

    this.dataService.getSaberEloLevel().subscribe((data: any[])=>{
      this.saber_elo_level = data;
      this.saber_elo_level = this.saber_elo_level.data;
    })  

    this.dataService.getFFEloLevel().subscribe((data: any[])=>{
      this.full_force_elo_level = data;
      this.full_force_elo_level = this.full_force_elo_level.data;
    })  

    //datatables();
    
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
