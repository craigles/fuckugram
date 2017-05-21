import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { InsultCardComponent } from './insult-card/insult-card.component';
import { InsultFormComponent } from './insult-form/insult-form.component';

const appRoutes: Routes = [
  { path: ':id', component: InsultCardComponent },
  { path: '**', component: InsultFormComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    InsultCardComponent,
    InsultFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
