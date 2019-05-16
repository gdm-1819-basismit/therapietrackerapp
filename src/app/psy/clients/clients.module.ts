import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClientsPage } from './clients.page';
import { SharedModule } from '../modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ClientsPage,
    children: [
      { path: 'client', loadChildren: './client/client.module#ClientPageModule' },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClientsPage]
})
export class ClientsPageModule {}
