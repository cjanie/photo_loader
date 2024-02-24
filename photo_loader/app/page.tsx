'use client'
import { useEffect, useState } from 'react'
import MenuVisitorComponant from './componants/MenuVisitorComponant'
import { classNames } from './componants/style/classNames'
import { di } from './di'
import { BoardUser, BoardVisitor, UserDi, VisitorDi } from './componants/menu/UseCase'
import { MenuUserComponant } from './componants/MenuUserComponant'
import { firebaseLoginAdapter } from './firebase/auth/firebaseLoginAdapter'
import { User } from './gateways/LoginGateway'
import LoginComponant from './componants/auth/LoginComponant'



export default function Home() {

  const [isUserIn, setUserIn] = useState<User>()

  const [loginRequest, setLoginRequest] = useState<boolean>()


  const userDi: UserDi = {
    uploadGateway: di.uploadGateway,
    downloadGateway: di.downloadGateway,
    fileRefQueryGateway: di.fileRefQueryGateway
  }

  const visitorDi: VisitorDi = {
    downloadGateway: di.downloadGateway,
    fileRefQueryGateway: di.fileRefQueryGateway
  }

  const startLogin = () => {
    setLoginRequest(true)
  }

  const setUserLoggedIn = (user: User) => {
    setUserIn(user)
    setLoginRequest(false)
  }

  const cancelLogin = () => {
    setLoginRequest(false)
  } 
  
  return (
    <main className={classNames.mainNoPadding}>
      
      { !loginRequest && isUserIn && (<MenuUserComponant di={userDi} />)
        
      }
      {
        loginRequest ? <LoginComponant setUserIn={setUserLoggedIn} onCancel={cancelLogin}/> : <MenuVisitorComponant di={visitorDi} onLogin={startLogin}/> 
      }
      
    </main>
  )
}

