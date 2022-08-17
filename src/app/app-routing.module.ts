import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { FootballComponent } from './products/football/football/football.component';
import { LentCalcComponent } from './products/length-caldulator/lent-calc/lent-calc.component';
import { TempComponent } from './temperature/temp/temp.component';
import { WeatherComponent } from './weather/weather/weather.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      {path: 'temp', component: TempComponent },
      {path: 'weather', component: WeatherComponent},
      {path: 'length', component: LentCalcComponent},
      {path:'football', component: FootballComponent},
      {
        path: 'products',
        loadChildren: () =>
          import('./products/product.module').then(m => m.ProductModule)
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
