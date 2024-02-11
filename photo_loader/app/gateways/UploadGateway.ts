export interface UploadGateway {
    upload : (file: File) => Promise<UploadResponse>
}

export interface UploadResponse {
    downloadUrl: string
}