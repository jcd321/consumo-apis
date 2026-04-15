import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { User } from "../models/user_models";

@Injectable({
    providedIn: 'root'
})

export class UsersServices{
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'https://backend-consumo-api-sroi.onrender.com/users';

    getUsers(): Observable<User[]>{
        return this.http.get<User[]>(this.apiUrl).pipe(
            catchError(this.handleError)
        );
    }

    getUseById(id: number): Observable<User>{
        return this.http.get<User>(`${this.apiUrl}/${id}`);
    }

    createUser(user: User): Observable<User>{
        return this.http.post<User>(this.apiUrl, user);
    }

    updateUser(id: number, user: User): Observable<User>{
        return this.http.put<User>(`${this.apiUrl}/${id}`, user);
    }

    deleteUser(id: number): Observable<any>{
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


