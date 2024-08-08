import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/herores.service';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {


  color:string = "lightpink";
  hero?: Hero;
  constructor(
    private heroService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit(): void {

    this.activatedRoute.params.pipe(
      delay(1000),
      switchMap(({ id }) => this.heroService.getHeroById(id))
    ).subscribe(hero => {
      if (!hero) return this.router.navigate(['/heroes/list']);
      this.hero = hero;
      return;
    });
  }

  goBack():void{
    this.router.navigateByUrl('/heroes/list');
  }

}
