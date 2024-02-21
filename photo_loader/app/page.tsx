'use client'
import MenuComponant from './componants/MenuComponant'
import { di } from './di'

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <MenuComponant uploadGateway={di.uploadGateway} downloadGateway={di.downloadGateway} fileRefQueryGateway={di.fileRefQueryGateway}/>

    </main>
  )
}

