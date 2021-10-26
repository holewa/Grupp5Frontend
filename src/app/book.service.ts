import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from './book';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'}) 
export class BookService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }
     public generateToken(request: any) {
    return this.http.post<string>("http://localhost:8080/authenticate", request, {  responseType: 'text' as 'json' });
  }


  public welcome(token: string) {
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<string>("http://localhost:8080/", {headers, responseType: 'text' as 'json' });
  }

    public getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(`${this.apiServerUrl}/api/book/findall`);
    }

    public addBook(book: Book, token: string): Observable<Book[]> {
        let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
        return this.http.post<Book[]>(`${this.apiServerUrl}/api/book/create`, book, {headers, responseType: 'text' as 'json' });
    }

    public updateBook(book: Book, token: string): Observable<Book[]> {
        let tokenStr = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', tokenStr);
        return this.http.put<Book[]>(`${this.apiServerUrl}/api/book/update/${book.id}`, book, {headers, responseType: 'text' as 'json' });
    }

    public deleteBook(bookId: number, token: string): Observable<void> {
        let tokenStr = 'Bearer ' + token;
        const headers = new HttpHeaders().set('Authorization', tokenStr);
        return this.http.delete<void>(`${this.apiServerUrl}/api/book/delete/?id=${bookId}`, {headers, responseType: 'text' as 'json' });
    }
}