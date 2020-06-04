import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { AccountData, Account } from "../data/account";

@Injectable()
export class AccountService extends AccountData {
    constructor(private httpClient: HttpClient) {
        super();
    }

    getAccounts(): Observable<Account[]> {
        return this.httpClient.get<Account[]>("/api/accounts");
    }

    getAccount(id: number): Observable<Account> {
        return this.httpClient.get<Account>("/api/accounts/" + id);
    }

    getSelf(): Observable<Account> {
        return this.httpClient.get<Account>("/api/accounts/self");
    }

    postAccount(account: Account): Observable<Account> {
        return this.httpClient.post<Account>("/api/accounts/", account);
    }

    putAccount(account: Account): Observable<Account> {
        return this.httpClient.put<Account>(
            "/api/accounts/" + account.id,
            account
        );
    }

    deleteAccount(account: Account): Observable<Account> {
        return this.httpClient.delete<Account>("/api/accounts/" + account.id);
    }
}
