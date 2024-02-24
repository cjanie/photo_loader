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

  const setLoggedIn = (loggedIn: boolean) => {
    if (loggedIn) {
      setUseCase({useCase: 'website'} as BoardUser)
    }
  }
  
  return (
    <main className={classNames.mainNoPadding}>
      
      {
        (useCase as BoardVisitor)?.visitWebSite ? <MenuVisitorComponant di={visitorDi} setLoggedIn={setLoggedIn}/> : <MenuUserComponant di={userDi} boardUser={useCase as BoardUser} />
      }
      
      
    </main>
  )
}

