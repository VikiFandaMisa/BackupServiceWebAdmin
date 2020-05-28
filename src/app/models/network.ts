export const FtpMode: number[] = [1, 2];
export const FtpEncryption: number[] = [1, 2,3];

export namespace FtpModeUtils {
    export function toString(status: number): string {
        switch(status) {
            case 1:
                return "pasive";
            case 2:
                return "active";            
        }
    }
}
export namespace FtpEncryptionUtils {
    export function toString(status: number): string {
        switch(status) {
            case 1:
                return "none";
            case 2:
                return "explicit";
            case 3:
                return "implicit" 
        }
    }
}

export class NetworkModel {        
    
    Server:string;
    Name:string;
    Password:string;

    Ftp:boolean;

    Mode:number;
    encryption:number;
}
