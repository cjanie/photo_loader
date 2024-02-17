'use client'
import FileUploadComponant from './componants/FileUploadComponant'
import FileDownloadComponant from './componants/FileDownloadComponant'
import { di } from './di'
import { fileNameQuery } from './firebase/db/fileNameQuery'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <FileUploadComponant uploadGateway={di.uploadGateway}/>
        {
          fileNameQuery.getFilesNames().map(fileName => <FileDownloadComponant downloadGateway={di.downloadGateway} fileName={fileName}/>)
        }
        
      </div>

    </main>
  )
}