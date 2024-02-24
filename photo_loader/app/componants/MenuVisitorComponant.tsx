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
import { BoardUser, BoardVisitor as UseCaseVisitor, UserDi, VisitorDi } from "./menu/UseCase"
import NavbarComponant from "./NavbarComponant"

interface VisitorDependencyProvision {
  di: VisitorDi
}

export default function MenuVisitorComponant(props: VisitorDependencyProvision) {

    
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