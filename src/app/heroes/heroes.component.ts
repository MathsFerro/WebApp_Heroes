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
  
  constructor(private heroService: HeroService) {}
  
  ngOnInit(): void {
    this.getHeros();
  }
 
  getHeros(): void{
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(name: String): void {
    // método trim() retorna o texto sem os espaços em branco no inicio e fim do texto
    name = name.trim();
    if(!name == null) { return }
    console.log('finalizad');
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  } 

  delete(hero:Hero): void{
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  // onSelect(hero: Hero): void{
  //   this.selectedHero = hero;
  //   this.messageService.add(`Hero Service: Selected hero id=${hero.id}`);
  // }

  /*getHeros(): void{
    this.heroes = this.heroService.getHeroes();
  }*/
  


}
