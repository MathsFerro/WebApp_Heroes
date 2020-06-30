import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  // ActivatedRoute mantém as informações sobre a rota para a instancia do
  // HeroDetailComponent

  // HeroService obtem os dados dos heróis do servidor remoto e esse 
  // component os utiliza para obter o herói para exibição

  // Location é um serviço do Angular para interagir com o navegador

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  // route.snapshot é uma imagem estática das informações da rota
  // logo após a criação do componente

  // paramMap é um dicionário de valores de parâmetros de rotas extraidos
  // da URL. A tecla 'id' retorna o id do herói a ser buscado

  // os parâmetros de rota são sempre do tipo string. O operador JavaScript
  // converte a sequência em um número, que deve ser o ID de um herói 

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  // Volta para página anterior
  goBack(): void{
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
