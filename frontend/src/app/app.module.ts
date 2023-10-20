import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { UserDatasComponent } from './components/page/user-datas/user-datas.component';
import { ResultsComponent } from './components/page/results/results.component';
import { GameComponent } from './components/page/game/game.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.moduls';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserDatasComponent,
    ResultsComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
