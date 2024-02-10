import FileFormComponant from "../componants/FileFormComponant"
import ImageComponant from "../componants/ImageComponant"

// https://www.youtube.com/watch?v=-_bhH4MLq1Y

export default function ServerUploadPage() {

    return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <FileFormComponant/>
      </div>
      <a href="/">
       <button>View list</button>
      </a>
    </main>
  )
}