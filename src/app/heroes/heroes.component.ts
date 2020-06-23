import { Component, OnInit } from '@angular/core';

import { Heroes } from '../mock-heroes';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  //heroes = Heroes;
  heroes: Hero[];
  selectedHero: Hero;
  
  constructor(private heroService: HeroService, private messageService:MessageService) {}
  
  ngOnInit(): void {
    this.getHeros();
  }


  onSelect(hero: Hero): void{
    this.selectedHero = hero;
    this.messageService.add(`Hero Service: Selected hero id=${hero.id}`);
  }
  
  getHeros(): void{
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  /*getHeros(): void{
    this.heroes = this.heroService.getHeroes();
  }*/
  


}
