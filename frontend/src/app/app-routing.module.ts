import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/page/game/game.component';
import { ResultsComponent } from './components/page/results/results.component';
import { UserDatasComponent } from './components/page/user-datas/user-datas.component';

const routes: Routes = [
  { path: 'game', component: GameComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'user-datas', component: UserDatasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


