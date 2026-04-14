import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Product } from "../models/product.models";

@Injectable({
    providedIn: 'root'
})

export class ProductsService{
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'http://127.0.0.1:8000/products';

    getProducts(): Observable<Product[]>{
        return this.http.get<Product[]>(this.apiUrl).pipe(
            catchError(this.handleError)
        );
    }

    getProductById(id: number): Observable<Product>{
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }

    createProduct(product: Product): Observable<Product>{
        return this.http.post<Product>(this.apiUrl, product);
    }

    updateProduct(id: number, product: Product): Observable<Product>{
        return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
    }

    deleteProduct(id: number): Observable<any>{
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    private handleError(error: HttpErrorResponse){
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}