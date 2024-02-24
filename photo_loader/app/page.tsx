'use client'
import { useEffect, useState } from 'react'
import MenuVisitorComponant from './componants/MenuVisitorComponant'
import { classNames } from './componants/style/classNames'
import { di } from './di'
import { BoardUser, BoardVisitor, UserDi, VisitorDi } from './componants/menu/UseCase'
import { MenuUserComponant } from './componants/MenuUserComponant'

export default function Home() {



  const [useCase, setUseCase] = useState<BoardUser | BoardVisitor>({visitWebSite: 'website'})

  useEffect(() => {
    setUseCase({useCase: 'download'})
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
        (useCase as BoardVisitor)?.visitWebSite ? <MenuVisitorComponant di={visitorDi} /> : <MenuUserComponant di={userDi} />
      }
      
      
    </main>
  )
}

