import { tempFilePathsStorage } from "../api/tempFilePathStorage"

export interface TempFilePathQuery {
    getPaths:() => Promise<string[]>
  }
  
  const tempFilePathQuery: TempFilePathQuery = {
    getPaths: async () => {
      return tempFilePathsStorage.paths
    }
  }