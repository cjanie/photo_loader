export interface DownloadGateway {
    getUrl: () => Promise<string> 
}