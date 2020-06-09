import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'eu',
  templateUrl: './eu.component.html',
  styleUrls: ['./eu.component.css']
})

export class EuComponent implements OnInit {

  title = 'jkranked.com';
  ffa_wl_ratio:any;
  saber_elo_level:any;
  full_force_elo_level:any;
  server_stats:any = null;

  constructor(private dataService: DataService,private router:Router) { }

  ngOnInit(): void {

    this.setRouteMenu();
    
    this.dataService.getServerStatsEU().subscribe((data: any[])=>{
      this.server_stats = data;
      this.server_stats = this.server_stats.data[0];
    })  

    //this.dataService.getFFAwlRatioEU().subscribe((data: any[])=>{
    //  this.ffa_wl_ratio = data;
    //  this.ffa_wl_ratio = this.ffa_wl_ratio.data;
    //})  

    this.dataService.getSaberEloLevelEU().subscribe((data: any[])=>{
      this.saber_elo_level = data;
      this.saber_elo_level = this.saber_elo_level.data;
    })  

    this.dataService.getFFEloLevelEU().subscribe((data: any[])=>{
      this.full_force_elo_level = data;
      this.full_force_elo_level = this.full_force_elo_level.data;
    })  

  }

  setRouteMenu(){
    const sa = document.querySelector('#sa');
    sa.className = '';

    const na = document.querySelector('#na');
    na.className = '';

    const eu = document.querySelector('#eu');
    eu.className = 'element active';
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
    color_name = color_name.replace(/\^8/g,'</span><span class="black_name">'); //Black
    color_name = color_name.replace(/\^9/g,'</span><span class="red_name">'); //Red

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
