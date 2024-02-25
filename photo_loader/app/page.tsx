'use client'
import { useEffect, useState } from 'react'
import MenuVisitorComponant from './componants/MenuVisitorComponant'
import { classNames } from './componants/style/classNames'
import { di } from './di'
import { BoardUser, BoardVisitor, UserDi, VisitorDi } from './componants/menu/UseCase'
import { MenuUserComponant } from './componants/MenuUserComponant'
import { firebaseLoginAdapter } from './firebase/auth/firebaseLoginAdapter'
import { User } from './gateways/LoginGateway'
import AuthComponant from './componants/auth/AuthComponant'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase/firebase-config'


export default function Home() {

  const [isUserIn, setUserIn] = useState<User | undefined>()

  const [authRequest, setauthRequest] = useState<boolean>()

  // Observe user auth
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          if(user.email) {
            setUserIn({email: user.email})
          }
        } else {
          // User is signed out
          setUserIn(undefined)
        }
      })
}, [])


const handleLogout = () => {               
  signOut(auth).then(() => {
      setUserIn(undefined)
  }).catch((error) => {
  // An error happened.
  })
}


  const userDi: UserDi = {
    uploadGateway: di.uploadGateway,
    downloadGateway: di.downloadGateway,
    fileRefQueryGateway: di.fileRefQueryGateway
  }

  const visitorDi: VisitorDi = {
    downloadGateway: di.downloadGateway,
    fileRefQueryGateway: di.fileRefQueryGateway
  }

  const startAuth = () => {
    setauthRequest(true)
  }

  const setAuth = (user: User) => {
    setUserIn(user)
    setauthRequest(false)
  }

  const cancelAuth = () => {
    setauthRequest(false)
  } 

  
  return (
    <main className={classNames.mainNoPadding}>
      
      { 
        isUserIn && <MenuUserComponant di={userDi} onLogout={handleLogout}/>   
      }
      { 
        isUserIn && <p>{isUserIn.email}</p>   
      }
      {
        authRequest && (
          
            <AuthComponant setUserIn={setAuth} onCancel={cancelAuth}/>
          
          )
        
      }
      {
        !authRequest && !isUserIn && <MenuVisitorComponant di={visitorDi} onLogin={startAuth}/>
      }
      
    </main>
  )
}

