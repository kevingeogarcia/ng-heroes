import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/herores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, filter, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent {

  public loading: boolean = true;
  public heroForm = new FormGroup(
    {
      id: new FormControl(''),
      superhero: new FormControl('', { nonNullable: true }),
      publisher: new FormControl<Publisher>(Publisher.DCComics),
      alter_ego: new FormControl(''),
      first_appearance: new FormControl(''),
      characters: new FormControl(''),
      alt_img: new FormControl('')
    })

  public publishers = [
    { id: 'DC Comics', value: 'DC - Comics' },
    { id: 'Marvel Comics', value: 'Marvel - Comics' },
    { id: 'ToeiAnimation', value: 'Toei Animation' },

  ]

  constructor(
    private heroService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      this.loading = false
      return;
    }

    this.activatedRoute.params.pipe(
      delay(1000),
      switchMap(({ id }) => this.heroService.getHeroById(id)),
    ).subscribe(hero => {
      if (!hero) return this.router.navigateByUrl('/');
      this.heroForm.reset(hero);
      this.loading = false;
      return;
    });


  }


  onSubmit(): void {
    if (this.heroForm.invalid) return;
    this.loading = true;
    if (this.currentHero.id) {
      setTimeout(() => {
        this.heroService.updateHero(this.currentHero).subscribe(hero => {
          this.showSnackbar(`${hero.superhero} updated!`)
          this.loading = false;
        });
      }, 1000);

      return;
    }

    this.heroService.addHero(this.currentHero).subscribe(hero => {
      // TODO: mostrar snackbar, y navegar a heroes/edit/hero.id
      this.router.navigate(['/heroes/edit', hero.id])
      this.showSnackbar(`${hero.superhero} Created!`)
    })
  }

  onConfirmDeleteHero(): void {
    if (!this.currentHero.id) throw Error('Hero id is required')

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed().pipe(
      filter( (result: boolean) => result ),
      switchMap( () => this.heroService.deleteByIdHero(this.currentHero)),
      filter( (wasDeleted: boolean) => wasDeleted ),
    ).subscribe(result => {
      this.router.navigate(['/heroes'])

    })


    // dialogRef.afterClosed().subscribe(result => {
    //   if(!result)  return;
    //   console.log(result);
    //   this.heroService.deleteByIdHero(this.currentHero).subscribe(wasDeleted => {
    //     if(wasDeleted)
    //         this.router.navigate(['/heroes'])
    //   });


    // })

  }


  showSnackbar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    })
  }

}
