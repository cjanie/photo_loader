export interface DownloadGateway {
    getUrl: (subDirectoryName: string,fileName: string) => Promise<string> 
}