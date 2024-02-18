interface FileRefQueryGateway {
    getFilesNames: () => Promise<string[]>,
    getMaxFilesNamesPerPage: (maxResultsPerPage: number) => Promise<string[]>
}