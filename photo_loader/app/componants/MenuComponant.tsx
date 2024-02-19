import { useState } from "react"
import FileUploadComponant from "./FileUploadComponant"
import { DI } from "../di"
import FilesDownloadComponant from "./FilesDownLoadComponant"
import { SubDirectoriesComponant } from "./SubDirectoriesComponant"

interface DependencyProvision {
    di: DI
}

interface UseCase {
    useCase: 'upload' | 'download'
  } 

export default function MenuComponant(props: DependencyProvision) {

    const [useCase, setUseCase] = useState<UseCase | undefined>()

    const upload = () => {
        setUseCase({useCase: 'upload'})
      }
    
      const download = () => {
        setUseCase({useCase: 'download'})
      }

    return (
        <div>
            <SubDirectoriesComponant/>
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
          useCase?.useCase === 'upload' && (<FileUploadComponant uploadGateway={props.di.uploadGateway} subDirectoryName="cairo"/>)
        }
        {
          useCase?.useCase === 'download' && (<FilesDownloadComponant downloadGateway={props.di.downloadGateway} fileRefQueryGateway={props.di.fileRefQueryGateway} subDirectoryName="cairo"/>)
        }
      </div>
        </div>
    )
}