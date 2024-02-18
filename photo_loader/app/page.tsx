'use client'
import FileUploadComponant from './componants/FileUploadComponant'
import FileDownloadComponant from './componants/FileDownloadComponant'
import { di } from './di'
import { storage } from './firebase/firebase-config'
import { ListResult, listAll, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'
import MenuComponant from './componants/MenuComponant'



export default function Home() {

  

  
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <MenuComponant/>

    </main>
  )
}

