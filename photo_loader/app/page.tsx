'use client'
import MenuComponant from './componants/MenuComponant'
import { di } from './di'

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <MenuComponant di={di}/>

    </main>
  )
}

