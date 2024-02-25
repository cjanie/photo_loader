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
import SignUpComponant from './componants/auth/SignUpComponant'


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
      
      { 
        isUserIn && <MenuUserComponant di={userDi} />   
      }
      {
        loginRequest && <SignUpComponant setUserIn={setUserLoggedIn} onCancel={cancelLogin}/> 
      }
      {
        !isUserIn && !loginRequest && <MenuVisitorComponant di={visitorDi} onLogin={startLogin}/>
      }
      
    </main>
  )
}

