export interface UploadGateway {
    upload : (folderName: string, file: File) => Promise<UploadResponse>
}

export interface UploadResponse {
    downloadUrl: string
}