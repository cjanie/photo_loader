interface FileRefQueryGateway {
    getFilesNames: () => Promise<string[]>,
    getPageToken: () => Promise<PageToken>
}