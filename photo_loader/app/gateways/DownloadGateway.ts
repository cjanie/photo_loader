export interface DownloadGateway {
    getUrl: (fileName: string) => Promise<string> 
}