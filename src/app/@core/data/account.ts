import { Observable } from "rxjs";

export interface Account {
    id: number;
    username: string;
    password: string;
    admin: boolean;
    email: string;
    sendReports: boolean;
}

export abstract class AccountData {
    abstract getAccounts(): Observable<Account[]>;
    abstract getAccount(id: number): Observable<Account>;
    abstract getSelf(): Observable<Account>;
    abstract postAccount(account: Account): Observable<Account>;
    abstract putAccount(account: Account): Observable<Account>;
    abstract deleteAccount(account: Account): Observable<Account>;
}
