import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from './book';
import { BookService } from './book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.getBooks();
    console.log(this.books)
  }

  public getBooks(token:string) : void {
    this.bookService.getBooks().subscribe(
      (response: Book[]) => {
        this.books = response
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      })
  }

  public onOpenModal(book: Book, mode:string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addBookModal');
    }
    if(mode === 'edit') {
      button.setAttribute('data-target', '#updateBookModal');
    }
    if(mode === 'delete') {
      button.setAttribute('data-target', '#deleteBookModal');
    }
    container?.appendChild(button);
    button.click();
  }
  public onAddBook(addForm: NgForm):void {
  }

  public consoleLog():void {
    console.log('hej');
  }
}
