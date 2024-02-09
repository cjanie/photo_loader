import { writeFile } from "fs/promises"
import { join } from "path"

// https://www.youtube.com/watch?v=-_bhH4MLq1Y

export default function ServerUploadPage() {

    async function upload(data:FormData) {
        'use server'
        const file: File | null = data.get('file') as unknown as File

        if(!file) {
            throw new Error('No file uploaded')
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // With the file data in the buffer, do what you want
        // Write it to the file system in a new location
        await tempFileRepository.writeTempFile(buffer, file.name)

        return {
            success: true
        }
    }

    return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <form className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex" action={upload}>
          <input type="file" name="file"/>
          <input type="submit" value="Upload"/>
        </form>
      </div>

    </main>
  );
} 

interface Path {
  path: string
}

interface TempFileRepository {
  writeTempFile: (buffer:Buffer, fileName: string) => Promise<Path> 

}

const tempFileRepository: TempFileRepository = {
  writeTempFile: async (buffer:Buffer, fileName: string): Promise<Path> => {
    const path = join('/', 'tmp', fileName)
    await writeFile(path, buffer)
    console.log('Open ' + path + ' to see the uploaded file')
    return {
      path: path
    }
  }
}