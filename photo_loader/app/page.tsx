'use client'
import MenuComponant from './componants/MenuComponant'
import { classNames } from './componants/style/classNames'
import { di } from './di'

export default function Home() {
  
  return (
    <main className={classNames.mainNoPadding}>
      
      <MenuComponant uploadGateway={di.uploadGateway} downloadGateway={di.downloadGateway} fileRefQueryGateway={di.fileRefQueryGateway}/>
      

      
    </main>
  )
}

