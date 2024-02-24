'use client'
import { useEffect, useState } from 'react'
import MenuVisitorComponant, { MenuUserComponant } from './componants/MenuComponant'
import { classNames } from './componants/style/classNames'
import { di } from './di'
import { UseCaseUser, UseCaseWebSite as UseCaseVisitor, UserDi, VisitorDi } from './componants/menu/UseCase'
import { UploadGateway } from './gateways/UploadGateway'
import { DownloadGateway } from './gateways/DownloadGateway'



export default function Home() {



  const [useCase, setUseCase] = useState<UseCaseUser | UseCaseVisitor>({visitWebSite: 'website'})

  useEffect(() => {
    setUseCase({visitWebSite: 'website'})
  })


  const userDi: UserDi = {
    uploadGateway: di.uploadGateway,
    downloadGateway: di.downloadGateway,
    fileRefQueryGateway: di.fileRefQueryGateway
  }

  const visitorDi: VisitorDi = {
    downloadGateway: di.downloadGateway,
    fileRefQueryGateway: di.fileRefQueryGateway
  }

  
  return (
    <main className={classNames.mainNoPadding}>
      
      {
        (useCase as UseCaseVisitor)?.visitWebSite ? <MenuVisitorComponant di={visitorDi} /> : <MenuUserComponant di={userDi} />
      
      }
      
      
    </main>
  )
}

