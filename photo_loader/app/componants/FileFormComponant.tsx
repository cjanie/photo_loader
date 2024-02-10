import { tempFilePathsStorage } from "../api/tempFilePathStorage"
import { tempFileRepository } from "../gateways/TempFileRepository"

export default function FileFormComponant() {

    async function upload(data:FormData) {
        'use server'
        const file: File | null = data.get('file') as unknown as File

        if(!file) {
            throw new Error('No file uploaded')
        }

        await tempFileRepository.writeTempFile(file, tempFilePathsStorage)

        return {
            success: true
        }
    }

    return(
        <form action={upload} className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <input type="file" name="file"/>
          <input type="submit" value="Upload"/>
        </form>
    )
}