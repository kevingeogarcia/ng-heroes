import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HeroesService } from '../../services/herores.service';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { HeroPageComponent } from '../hero-page/hero-page.component';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent implements OnInit {

  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;


  constructor(private heroServiceSerch: HeroesService) {

  }
  ngOnInit(): void {

  }

  searchHero() {
    const value: string = this.searchInput.value || '';
    this.heroServiceSerch.getSuggestions(value || '').subscribe(heroes => this.heroes = heroes);
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }


}
