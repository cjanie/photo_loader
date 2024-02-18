interface FileRefQueryGateway {
    getFilesNames: () => Promise<string[]>
}