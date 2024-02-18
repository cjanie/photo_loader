'use client'
import FileUploadComponant from './componants/FileUploadComponant'
import FileDownloadComponant from './componants/FileDownloadComponant'
import { di } from './di'
import { storage } from './firebase/firebase-config'
import { ListResult, listAll, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'

interface UseCase {
  useCase: 'upload' | 'download'
} 

export default function Home() {

  const [useCase, setUseCase] = useState<UseCase | undefined>()

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

  const upload = () => {
    setUseCase({useCase: 'upload'})
  }

  const download = () => {
    setUseCase({useCase: 'download'})
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {
          !useCase && (<div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <button onClick={upload} className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
                        >Upload</button>
            <button onClick={download} className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
                        >Download</button>
          </div>)
        }
        {
          useCase?.useCase === 'upload' && (<button onClick={download} className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
          >Download</button>)
        }
        {
          useCase?.useCase === 'download' && (<button onClick={upload} className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
          >Upload</button>)
        }
      </div>

      <div>
        {
          useCase?.useCase === 'upload' && (<FileUploadComponant uploadGateway={di.uploadGateway}/>)
        }
        {
          useCase?.useCase === 'download' && 
              fileNames.map(fileName => <FileDownloadComponant downloadGateway={di.downloadGateway} fileName={fileName}/>)
        }
      </div>

    </main>
  )
}

