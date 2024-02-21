import { useState } from "react"
import FileUploadComponant from "./FileUploadComponant"
import { DI } from "../di"
import FilesDownloadComponant from "./FilesDownLoadComponant"
import { SelectComponant } from "./SubDirectoriesComponant"
import { firebaseSubdirectoryNameQueryAdapter } from "../firebase/firebaseSubdirectoryNameQueryAdapter"
import WebSiteComponant from "./WebSiteComponant"
import { DownloadGateway } from "../gateways/DownloadGateway"
import { UploadGateway } from "../gateways/UploadGateway"

interface DependencyProvision {
    uploadGateway: UploadGateway,
    downloadGateway: DownloadGateway,
    fileRefQueryGateway: FileRefQueryGateway
}

interface UseCaseUser {
    useCaseUser: 'upload' | 'download'
  }

interface UseCaseWebSite {
  useCaseWebSite: 'website'
}

export default function MenuComponant(props: DependencyProvision) {

    const [useCaseUser, setUseCaseUser] = useState<UseCaseUser | undefined>()
    const [useCaseVisitor, setUseCaseVisitor] = useState<UseCaseWebSite>()
    const [directoryName, setDirectoryName] = useState<string>()

    const upload = () => {
        setUseCaseUser({useCaseUser: 'upload'})
      }
    
      const download = () => {
        setUseCaseUser({useCaseUser: 'download'})
      }

      const setSelectedDirectory = (directory: string) => {
        setDirectoryName(directory)
      }

      const directoriesNames = () => firebaseSubdirectoryNameQueryAdapter.getDirectoriesNames()

      const webSite = () => {
        setUseCaseVisitor({useCaseWebSite: 'website'})
      }

    return (
        <div>
          
          <nav data-active={true}>

            <div>
            {
              !useCaseVisitor && 
              (<div>
                <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                  <SelectComponant setSelectedValue={setSelectedDirectory} options={directoriesNames}/>
                </div>
                <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                  <button onClick={upload}>Upload</button>
                </div>
                <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    <button onClick={download}>Download</button>
                </div>
                <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                  <button onClick={webSite}>Web site</button>
                </div>
              </div>)
            }
            </div>
        </nav>
      <div>
        {
          useCaseUser?.useCaseUser === 'upload' && directoryName && (<FileUploadComponant uploadGateway={props.uploadGateway} subDirectoryName={directoryName}/>)
        }
        {
          useCaseUser?.useCaseUser === 'download' && directoryName && (<FilesDownloadComponant downloadGateway={props.downloadGateway} fileRefQueryGateway={props.fileRefQueryGateway} subDirectoryName={directoryName} imageSize={100}/>)
        }
      </div>
      <div>
        {
          useCaseVisitor?.useCaseWebSite && directoryName && (<WebSiteComponant downloadGateway={props.downloadGateway} fileRefQueryGateway={props.fileRefQueryGateway} subDirectoryName={directoryName}/>)
        }
      </div>
    </div>
    )
}