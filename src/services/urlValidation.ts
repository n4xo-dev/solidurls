export function getValidUrl(url: string) {
    try {
        return new URL(url).toString();
    }
    catch (_) {
        return "";
    }
}