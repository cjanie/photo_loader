'use client'
import { useEffect, useState } from 'react'
import FileSelectionComponant from './componants/FileSelectionComponant'

export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <FileSelectionComponant/>
        
        <a className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="/server"
            target="_blank"
            rel="noopener noreferrer">
          <button className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Go to&nbsp;
            <code className="font-mono font-bold">/server</code>
          </button>
        </a>

        
      </div>

    </main>
  )
}
