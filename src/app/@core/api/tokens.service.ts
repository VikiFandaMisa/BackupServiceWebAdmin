import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

import { TokenData, Token } from "../data/tokens";

@Injectable()
export class TokenService extends TokenData {
    _token: string;

    constructor(private http: HttpClient) {
        super();
    }

    token(): string {
        if (this._token != null)
            this._loadToken();
        return this._token;
    }

    authorizationHeader(): string {
        return "Bearer " + this.token;
    }

    _loadToken() {
        this._token = sessionStorage.getItem("token");
    }

    _saveToken() {
        sessionStorage.setItem("token", this.token());
    }

    authenticate(username: string, password: string): Observable<Token> {
        return this.http
            .post<Token>(
                "/api/token/user",
                {
                    Username: username,
                    Password: password,
                },
                {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                    }),
                }
            )
            .pipe(
                map((token) => {
                    this._token = token.token;
                    this._saveToken();
                    return token;
                })
            );
    }

    logout() {
        this.http
            .delete("/api/token", {
                headers: new HttpHeaders({
                    Authorization: this.authorizationHeader(),
                }),
            })
            .subscribe();
        this.token = null;
        sessionStorage.clear();
    }
}
