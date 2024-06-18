import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transaction {
  id: string;
  date: string;
  comments: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:3030/api';

  constructor(private http: HttpClient) { }

  getTransactions(startDate?: string, endDate?: string): Observable<Transaction[]> {
    let params: any = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`, { params });
  }

  getTransactionById(id: string): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/detail-transaction`, { id });
  }

  updateTransaction(id: string, comments: string): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/update-comment`, {id, comments});
  }
}
