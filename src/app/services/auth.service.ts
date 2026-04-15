import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { LoginRequest } from "../models/LoginRequest.models";
import { RegisterRequest } from "../models/register-request.models";
import { Token } from "../models/token.models";
import { User } from "../models/user_models";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'https://backend-consumo-api-sroi.onrender.com';

    login(credentials: LoginRequest): Observable<Token> {
        return this.http.post<Token>(`${this.apiUrl}/auth/login`, credentials).pipe(
            catchError(this.handleError)
        );
    }

    register(userData: RegisterRequest): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/auth/register`, userData).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
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