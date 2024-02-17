'use client'
import FileUploadComponant from './componants/FileUploadComponant'
import FileDownloadComponant from './componants/FileDownloadComponant'
import { di } from './di'
import { storage } from './firebase/firebase-config'
import { ListResult, listAll, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'

export default function Home() {

  const [fileNames, setFileNames] = useState<string[]>([])

  useEffect(()=> {
    filesStorage().then(fileNames => setFileNames(fileNames)) }
  , [fileNames])

  const filesStorage = async () => {

    // Create a reference under which you want to list
    const listRef = ref(storage, 'files');
    // Find all the prefixes and items.
    const listResult: ListResult = await listAll(listRef)

    var storedFilesNames: string[] = []
    listResult.items.forEach(storageReference => {
      console.log(storageReference.name + " full path = " + storageReference.fullPath)
      storedFilesNames.push(storageReference.name)
    })
    return storedFilesNames
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">

        <FileUploadComponant uploadGateway={di.uploadGateway}/>
        {
          fileNames.map(fileName => <FileDownloadComponant downloadGateway={di.downloadGateway} fileName={fileName}/>)
        }
        
      </div>

    </main>
  )
}

