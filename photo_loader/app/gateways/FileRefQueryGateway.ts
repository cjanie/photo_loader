interface FileRefQueryGateway {
    getFilesNames: () => Promise<string[]>,
    initPageTokenQuery: () => Promise<PageToken>,
    nextPageToken: () => Promise<PageToken>
}