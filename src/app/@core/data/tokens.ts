import { Observable } from "rxjs";

export interface Token {
    token: string
}

export abstract class TokenData {
    abstract authorizationHeader(): string;
    abstract token(): string;
    abstract authenticate(username: string, password: string): Observable<Token>;
    abstract logout(): void;
}
