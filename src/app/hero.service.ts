import { Injectable } from '@angular/core';
import { Hero } from './hero'; // Importando a inteface
import { Heroes } from './mock-heroes'; // Importando os heroes
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';

  httpOptions = {
    headers: new HttpHeaders({'Content Type': 'application/json'})
  };


  constructor(
      private http: HttpClient,
      private messageService: MessageService
    ) {}

  // getHero() tem uma assinatura assincrona 
  //Retorna um herói como um Observável, usando a função RxJS
  // getHero(id : number): Observable<Hero> {
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(Heroes.find(hero => hero.id === id));
  // }



  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  
  // Pegando os heroes do server
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )
  }

  getHero(id:number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  updateHero(hero:Hero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero: ${hero.id}`)),
      catchError(this.handleError<any>('update hero'))  
    )
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  // Deletar o hero do servidor
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero == 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>(`deleteHero`))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()){
      // se não encontrar nada, retorna vazio no array hero
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error:any): Observable<T> => {
      console.log(error);

      // transformação do erro para consumo do usuário
      this.log(`${operation} failed: ${error.message}`);

      // deixa o aplicativo continuar em execução retornando um resultado vazio
      return of(result as T);
    }
  }


  // Usando RxJS
  // getHeroes(): Observable<Hero[]> {
  //   this.messageService.add('HeroService: fetched heroes');
  //   return of(Heroes);
  // }


}
