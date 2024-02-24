import { ReactNode, useEffect, useState } from "react"
import FileUploadComponant from "./FileUploadComponant"
import { DI } from "../di"
import FilesDownloadComponant from "./FilesDownLoadComponant"
import { SelectComponant } from "./global/SelectComponant"
import { firebaseSubdirectoryNameQueryAdapter } from "../firebase/firebaseSubdirectoryNameQueryAdapter"
import WebSiteComponant from "./WebSiteComponant"
import { DownloadGateway } from "../gateways/DownloadGateway"
import { UploadGateway } from "../gateways/UploadGateway"
import { classNames } from "./style/classNames"
import { UseCaseUser, UseCaseWebSite as UseCaseVisitor, UserDi, VisitorDi } from "./menu/UseCase"
import NavbarComponant from "./NavbarComponant"

interface DependencyProvision {
    di: UserDi | VisitorDi
}

export function MenuUserComponant(props: DependencyProvision) {
  const [useCaseUser, setUseCaseUser] = useState<UseCaseUser | undefined>()
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

  const navbarElements: ReactNode[] = [
    <SelectComponant setSelectedValue={setSelectedDirectory} options={directoriesNames}/>,
    <button onClick={upload} disabled={useCaseUser?.useCaseUser === 'upload'} hidden={useCaseUser?.useCaseUser === 'upload'}>Upload</button>,
    <button onClick={download} disabled={useCaseUser?.useCaseUser === 'download'} hidden={useCaseUser?.useCaseUser === 'download'}>Download</button>
] 

  return (
    <div className={classNames.fixedTopNoPadding}>
      
          <div className={classNames.widthFull}>
            
            <div className={classNames.fixedTopNoPadding}>
              {
                useCaseUser?.useCaseUser === 'upload' && directoryName && (<FileUploadComponant uploadGateway={(props.di as UserDi).uploadGateway} subDirectoryName={directoryName}/>)
              }
              {
                useCaseUser?.useCaseUser === 'download' && directoryName && (<FilesDownloadComponant downloadGateway={(props.di as UserDi).downloadGateway} fileRefQueryGateway={props.di.fileRefQueryGateway} subDirectoryName={directoryName} imageSize={500}/>)
              }

            </div>

            <div className="fixed left-0 top-0 w-full"><NavbarComponant options={navbarElements}/></div>
          </div>
    </div>
)

}

export default function MenuVisitorComponant(props: DependencyProvision) {

    
    const [useCaseVisitor, setUseCaseVisitor] = useState<UseCaseVisitor>()
    const [directoryName, setDirectoryName] = useState<string>()

      const setSelectedDirectory = (directory: string) => {
        setDirectoryName(directory)
      }

      const directoriesNames = () => firebaseSubdirectoryNameQueryAdapter.getDirectoriesNames()

      useEffect(() => {
        webSite()
      })

      const webSite = () => {
        setUseCaseVisitor({visitWebSite: 'website'})
      }

      const navbarElements: ReactNode[] = [
        <SelectComponant setSelectedValue={setSelectedDirectory} options={directoriesNames}/>,
        ] 

    return (
        <div className={classNames.fixedTopNoPadding}>
          
          
          <div className={classNames.fixedTopNoPadding}>
            {
              useCaseVisitor?.visitWebSite && directoryName && (<WebSiteComponant downloadGateway={props.di.downloadGateway} fileRefQueryGateway={props.di.fileRefQueryGateway} subDirectoryName={directoryName}/>)
            }
          </div>
          <div className="fixed left-0 top-0 w-full"><NavbarComponant options={navbarElements}/></div>
        </div>
    )
}