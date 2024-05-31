export module LogHelper {
    export function log(message: string) {
        console.log(`[SHRUG]: ${message}`);
    }
    export function error(message: string, error: any) {
        console.error(`[SHRUG]: ${message}: `, error);
    }
}