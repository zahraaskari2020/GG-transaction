import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';

const routes: Routes = [
  { path: '', component: TransactionListComponent },
  { path: 'details/:id', component: TransactionDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
