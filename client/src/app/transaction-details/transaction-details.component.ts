import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService, Transaction } from '../transaction.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  transaction: Transaction = {
    id: '',
    date: '',
    comments: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.transactionService.getTransactionById(id).subscribe(transaction => {
        this.transaction = transaction;
      });
    }
  }

  updateComments(): void {
    this.transactionService.updateTransaction(this.transaction.id, this.transaction.comments).subscribe(() => {
      this.router.navigate(['/']);
    }, error => {
      console.error('Error updating transaction:', error);
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
