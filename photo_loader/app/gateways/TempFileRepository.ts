import { writeFile } from "fs/promises"
import { TempFilePaths } from "./TempFilePaths"
import { join } from "path"

export interface Path {
    path: string
  }

export interface TempFileRepository {
    writeTempFile: (file: File, tempFilePaths: TempFilePaths) => Promise<Path> 
  
}
  
  
export  const tempFileRepository: TempFileRepository = {
    writeTempFile: async (file: File, tempFilePaths: TempFilePaths): Promise<Path> => {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // With the file data in the buffer, do what you want
      // Write it to the file system in a new location
      const path = join('/', 'tmp', file.name)
      await writeFile(path, buffer)
      tempFilePaths.paths.push(path)
      console.log('Open ' + path + ' to see the uploaded file')
      return {
        path: path
      }
    }
  }