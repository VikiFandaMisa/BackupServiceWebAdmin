import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { AccountData, Account } from "../data/accounts";
import { TokenService } from "./tokens.service";

@Injectable()
export class AccountService extends AccountData {
    constructor(private httpClient: HttpClient, private tokenService: TokenService) {
        super();
    }

    getAccounts(): Observable<Account[]> {
        return this.httpClient.get<Account[]>("/api/accounts", {
            headers: new HttpHeaders({
                Authorization: this.tokenService.authorizationHeader(),
            }),
        });
    }

    getAccount(id: number): Observable<Account> {
        return this.httpClient.get<Account>(
            "/api/accounts/" + id,
            {
                headers: new HttpHeaders({
                    Authorization: this.tokenService.authorizationHeader(),
                }),
            }
        );
    }

    getSelf(): Observable<Account> {
        return this.httpClient
            .get<Account>("/api/accounts/self", {
                headers: new HttpHeaders({
                    Authorization: this.tokenService.authorizationHeader(),
                }),
            });
    }

    postAccount(account: Account): Observable<Account> {
        return this.httpClient.post<Account>(
            "/api/accounts",
            account,
            {
                headers: new HttpHeaders({
                    Authorization: this.tokenService.authorizationHeader(),
                }),
            }
        );
    }

    putAccount(account: Account): Observable<Account> {
        return this.httpClient.put<Account>(
            "/api/accounts/" + account.id,
            account,
            {
                headers: new HttpHeaders({
                    Authorization: this.tokenService.authorizationHeader(),
                }),
            }
        );
    }

    deleteAccount(account: Account): Observable<Account> {
        return this.httpClient.delete<Account>(
            "/api/accounts/" + account.id,
            {
                headers: new HttpHeaders({
                    Authorization: this.tokenService.authorizationHeader(),
                }),
            }
        );
    }
}
