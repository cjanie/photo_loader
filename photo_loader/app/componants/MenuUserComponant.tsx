import { ReactNode, useState } from "react"
import { BoardUser, UserDi } from "./menu/UseCase"
import { firebaseSubdirectoryNameQueryAdapter } from "../firebase/firebaseSubdirectoryNameQueryAdapter"
import { SelectComponant } from "./global/SelectComponant"
import { classNames } from "./style/classNames"
import FileUploadComponant from "./FileUploadComponant"
import FilesDownloadComponant from "./FilesDownLoadComponant"
import NavbarComponant from "./NavbarComponant"

interface UserDependencyProvision {
    di: UserDi
}

export function MenuUserComponant(props: UserDependencyProvision) {
  const [useCaseUser, setUseCaseUser] = useState<BoardUser | undefined>()
  const [directoryName, setDirectoryName] = useState<string>()


  const upload = () => {
    setUseCaseUser({useCase: 'upload'})
  }

  const download = () => {
    setUseCaseUser({useCase: 'download'})
  }

  const webSite = () => {
    setUseCaseUser({useCase: 'website'})
  }

  const setSelectedDirectory = (directory: string) => {
    setDirectoryName(directory)
  }

  const directoriesNames = () => firebaseSubdirectoryNameQueryAdapter.getDirectoriesNames()

  const navbarElements: ReactNode[] = [
    <SelectComponant setSelectedValue={setSelectedDirectory} options={directoriesNames}/>,
    <button onClick={upload} disabled={useCaseUser?.useCase === 'upload'} hidden={useCaseUser?.useCase === 'upload'}>Upload</button>,
    <button onClick={download} disabled={useCaseUser?.useCase === 'download'} hidden={useCaseUser?.useCase === 'download'}>Download</button>,
    <button onClick={webSite} disabled={useCaseUser?.useCase === 'website'} hidden={useCaseUser?.useCase === 'website'}>Web site</button>
] 

  return (
    <div className={classNames.fixedTopNoPadding}>
          <div className={classNames.widthFull}>
            
            <div className={classNames.fixedTopNoPadding}>
              {
                useCaseUser?.useCase === 'upload' && directoryName && (<FileUploadComponant uploadGateway={(props.di as UserDi).uploadGateway} subDirectoryName={directoryName}/>)
              }
              {
                useCaseUser?.useCase === 'download' && directoryName && (<FilesDownloadComponant downloadGateway={props.di.downloadGateway} fileRefQueryGateway={props.di.fileRefQueryGateway} subDirectoryName={directoryName} imageSize={500}/>)
              }
              {
                useCaseUser?.useCase === 'website' && directoryName && (<FilesDownloadComponant downloadGateway={props.di.downloadGateway} fileRefQueryGateway={props.di.fileRefQueryGateway} subDirectoryName={directoryName} imageSize={500}/>)
              }

            </div>

            <div className="fixed left-0 top-0 w-full"><NavbarComponant options={navbarElements}/></div>
          </div>
    </div>
)

}