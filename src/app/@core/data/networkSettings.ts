export const FtpMode: number[] = [1, 2];
export const FtpEncryption: number[] = [1, 2, 3];

export namespace FtpModeUtils {
    export function toString(status: number): string {
        switch (status) {
            case 1:
                return "pasive";
            case 2:
                return "active";
        }
    }
}
export namespace FtpEncryptionUtils {
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

export interface NetworkSettings {
    server: string;
    name: string;
    password: string;
    ftp: boolean;
    mode: number;
    encryption: number;
}
