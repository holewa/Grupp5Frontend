import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Book } from './book';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'}) 
export class BookService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(`${this.apiServerUrl}/api/book/findall`);
    }

    public addBook(book: Book): Observable<Book[]> {
        return this.http.post<Book[]>(`${this.apiServerUrl}/api/book/create`, book);
    }

    public updateBook(book: Book): Observable<Book[]> {
        return this.http.put<Book[]>(`${this.apiServerUrl}/api/book/update/${book.id}`, book);
    }

    public deleteBook(bookId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/book/delete/?id=${bookId}`);
    }
}