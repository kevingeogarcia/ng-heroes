import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { MaterialModule } from '../material/material.module';

import { ListPageComponent } from './pages/list-page/list-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';


@NgModule({
  declarations: [
    ListPageComponent,
    LayoutPageComponent,
    HeroPageComponent,
    SearchPageComponent,
    NewPageComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    MaterialModule
  ]
})
export class HeroesModule { }
