import { useState } from "react"
import FileUploadComponant from "./FileUploadComponant"
import { DI } from "../di"
import FilesDownloadComponant from "./FilesDownLoadComponant"
import { SelectComponant } from "./SubDirectoriesComponant"
import { firebaseSubdirectoryNameQueryAdapter } from "../firebase/firebaseSubdirectoryNameQueryAdapter"

interface DependencyProvision {
    di: DI
}

interface UseCase {
    useCase: 'upload' | 'download'
  } 

export default function MenuComponant(props: DependencyProvision) {

    const [useCase, setUseCase] = useState<UseCase | undefined>()
    const [directoryName, setDirectoryName] = useState<string>()

    const upload = () => {
        setUseCase({useCase: 'upload'})
      }
    
      const download = () => {
        setUseCase({useCase: 'download'})
      }

      const setSelectedDirectory = (directory: string) => {
        setDirectoryName(directory)
      }

      const directoriesNames = () => firebaseSubdirectoryNameQueryAdapter.getDirectoriesNames()

    return (
        <div>
          
          <nav data-active={true}>
          <div>
            
              
                <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                <SelectComponant setSelectedValue={setSelectedDirectory} options={directoriesNames}/>
                </div>
              
              
             <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              <button onClick={upload}>Upload</button>
             </div>
             <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                <button onClick={download}>Download</button>
             </div>
              
              
             
              
          </div>
        </nav>


      <div>
        {
          useCase?.useCase === 'upload' && directoryName && (<FileUploadComponant uploadGateway={props.di.uploadGateway} subDirectoryName={directoryName}/>)
        }
        {
          useCase?.useCase === 'download' && directoryName && (<FilesDownloadComponant downloadGateway={props.di.downloadGateway} fileRefQueryGateway={props.di.fileRefQueryGateway} subDirectoryName={directoryName}/>)
        }
      </div>
        </div>
    )
}