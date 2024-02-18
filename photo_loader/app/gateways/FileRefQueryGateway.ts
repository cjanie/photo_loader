interface FileRefQueryGateway {
    getFilesNames: () => Promise<string[]>,
    getMaxFilesNamesPerPage: (maxResultsPerPage: number) => Promise<string[]>
    next:(maxResultsPerPage: number) => Promise<string[]>
}