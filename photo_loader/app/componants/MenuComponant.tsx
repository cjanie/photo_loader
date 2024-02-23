import { ReactNode, useState } from "react"
import FileUploadComponant from "./FileUploadComponant"
import { DI } from "../di"
import FilesDownloadComponant from "./FilesDownLoadComponant"
import { SelectComponant } from "./global/SelectComponant"
import { firebaseSubdirectoryNameQueryAdapter } from "../firebase/firebaseSubdirectoryNameQueryAdapter"
import WebSiteComponant from "./WebSiteComponant"
import { DownloadGateway } from "../gateways/DownloadGateway"
import { UploadGateway } from "../gateways/UploadGateway"
import { classNames } from "./style/classNames"
import { UseCaseUser, UseCaseWebSite } from "./menu/UseCase"
import NavbarComponant from "./NavbarComponant"

interface DependencyProvision {
    uploadGateway: UploadGateway,
    downloadGateway: DownloadGateway,
    fileRefQueryGateway: FileRefQueryGateway
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

      const navbarElements: ReactNode[] = [
        <SelectComponant setSelectedValue={setSelectedDirectory} options={directoriesNames}/>,
        <button onClick={upload} disabled={useCaseUser?.useCaseUser === 'upload'} hidden={useCaseUser?.useCaseUser === 'upload'}>Upload</button>,
        <button onClick={download} disabled={useCaseUser?.useCaseUser === 'download'} hidden={useCaseUser?.useCaseUser === 'download'}>Download</button>,
        <button onClick={webSite} disabled={useCaseVisitor?.useCaseWebSite === 'website'} hidden={useCaseVisitor?.useCaseWebSite === 'website'}>Web site</button>
    ] 

    return (
        <div className={classNames.fixedTopNoPadding}>
          {
            !useCaseVisitor && (
              <div className={classNames.widthFull}>
                
                <div className={classNames.fixedTopNoPadding}>
                  {
                    useCaseUser?.useCaseUser === 'upload' && directoryName && (<FileUploadComponant uploadGateway={props.uploadGateway} subDirectoryName={directoryName}/>)
                  }
                  {
                    useCaseUser?.useCaseUser === 'download' && directoryName && (<FilesDownloadComponant downloadGateway={props.downloadGateway} fileRefQueryGateway={props.fileRefQueryGateway} subDirectoryName={directoryName} imageSize={500}/>)
                  }

                </div>

                <div className="fixed left-0 top-0 w-full"><NavbarComponant options={navbarElements}/></div>
                
      
                  
              </div>
            )
          }
          
          <div>
            {
              useCaseVisitor?.useCaseWebSite && directoryName && (<WebSiteComponant downloadGateway={props.downloadGateway} fileRefQueryGateway={props.fileRefQueryGateway} subDirectoryName={directoryName}/>)
            }
          </div>
        </div>
    )
}