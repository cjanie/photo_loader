interface FileRefQueryGateway {
    getFilesNames: () => Promise<string[]>,
    initPageTokenQuery: (subDirectoryName: string) => Promise<PageToken>,
    nextPageToken: () => Promise<PageToken>
}