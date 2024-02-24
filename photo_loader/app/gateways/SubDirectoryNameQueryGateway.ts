export interface SubDirectoryNameQueryGateway {
    getDirectoriesNames: () => Promise<string[]>
}