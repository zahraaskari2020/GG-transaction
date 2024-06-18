import { Component, OnInit } from '@angular/core';
import { TransactionService, Transaction } from '../transaction.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  startDate: string | undefined;
  endDate: string | undefined;

  constructor(private transactionService: TransactionService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadTransactions();
      }
    });
  }

  ngOnInit(): void {
    this.loadTransactions();
   }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
    });
  }
  

  filterTransactions(): void {
    this.transactionService.getTransactions(this.startDate, this.endDate).subscribe(transactions => {
      this.transactions = transactions;
    });
  }
}
