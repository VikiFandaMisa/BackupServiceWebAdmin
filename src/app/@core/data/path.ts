export const networkMode: number[] = [1, 2];
export const networkEncryption: number[] = [1, 2, 3];

export namespace NetworkModeUtils {
    export function toString(status: number): string {
        switch (status) {
            case 1:
                return "active";
            case 2:
                return "passive";
        }
    }
}

export namespace NetworkEncryptionUtils {
    export function toString(status: number): string {
        switch (status) {
            case 1:
                return "none";
            case 2:
                return "explicit";
            case 3:
                return "implicit";
        }
    }
}

export class NetworkSettings {
    server: string;
    name: string;
    password: string;
    mode: number;
    encryption: number;
}

export interface Path {
    id: number;
    network: NetworkSettings;
    directory: string;
}
