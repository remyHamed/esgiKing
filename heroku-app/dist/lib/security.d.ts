export declare class SecurityUtils {
    static sha512(str: string): string;
}
export declare const getTokenRole: (token: string) => Promise<string>;
export declare const checkSpecificAuthor: (token: string | undefined, role: string) => Promise<void>;
