import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionListComponent,
    TransactionDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
