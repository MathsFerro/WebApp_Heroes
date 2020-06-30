import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;

  // Um Subject é uma fonte de valores observáveis e um Observable em si
  private searchTerms = new Subject<String>();

  constructor(private heroService: HeroService) { }

  search(term: string): void{
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // esperar 300ms após cada pressionamento de tecla antes de considerar o termo
      debounceTime(300),

      // ignorar novo termo se for igual ao termo anterior
      distinctUntilChanged(),

      // mude para nova pesquisa observável sempre que o termo for alterado
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

}
