import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { OperationResolver } from './operation-resolver';
import { InsultService } from './insult.service';

import { AppComponent } from './app.component';
import { InsultCardComponent } from './insult-card/insult-card.component';
import { InsultFormComponent } from './insult-form/insult-form.component';
import { TruncatePipe } from './truncate.pipe';

const appRoutes: Routes = [
  { path: ':id', component: InsultCardComponent },
  { path: '**', component: InsultFormComponent, resolve: {operations: OperationResolver} },
];

@NgModule({
  declarations: [
    AppComponent,
    InsultCardComponent,
    InsultFormComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [OperationResolver, InsultService],
  bootstrap: [AppComponent]
})
export class AppModule { }
