'use client'
import FileUploadComponant from './componants/FileUploadComponant'
import FileDownloadComponant from './componants/FileDownloadComponant'
import { di } from './di'
import { fileNameQuery } from './firebase/db/fileNameQuery'
import { storage } from './firebase/firebase-config'
import { listAll, ref } from 'firebase/storage'
import { useState } from 'react'

export default function Home() {

  const [fileNames, setFileNames] = useState<string[]>([])

  const filesStorage = () => {

    var storedFilesNames: string[] = []
    // Create a reference under which you want to list
    const listRef = ref(storage, 'files');
    // Find all the prefixes and items.
    listAll(listRef)
    .then((listResult) => {
    listResult.prefixes.forEach((folderRef) => {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
        console.log(folderRef.name + " full path = " + folderRef.fullPath)
        storedFilesNames.push(folderRef.name)
       
    });
    listResult.items.forEach((itemRef) => {
        // All the items under listRef.
        console.log(itemRef.name + " full path = " + itemRef.fullPath)
    });
    }).catch((error) => {
    // Uh-oh, an error occurred!
    console.error(error.message)
    });
  }
  filesStorage()
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

