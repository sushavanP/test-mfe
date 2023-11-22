import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

const MFE_REMOTE_URL = 'http://localhost:5200/remoteEntry.js';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'todo',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: MFE_REMOTE_URL,
        exposedModule: './TodoModule',
      }).then((m) => m.TodoListModule).catch(err => console.log('error', err)),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [
  HomeComponent
]
