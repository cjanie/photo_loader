import type { NextApiRequest, NextApiResponse } from 'next'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') return await fileGET(req, res)
  if (req.method === 'POST') return await filePOST(req, res)
  return res.status(400).end()
}

// Disable parsing the body by Next.js default behavior
export const config = {
  api: {
    bodyParser: false,
  },
}


async function filePOST(request: NextApiRequest, res: NextApiResponse) {
  // Initialize the Firebase app with the provided configuration
  const app = initializeApp(fireBaseConfig)
  // Get a reference to the Firebase Storage and parse the request data as a FormData object
  const storage = getStorage(app)
  // More code to handle uploads incoming...
}



const chunks: never[] = []
const { fields, files } = await formidablePromise(request, {
    ...formidableConfig,
    fileWriteStreamHandler: () => fileConsumer(chunks),
})
const file = files.file
const fileBuffer = Buffer.concat(chunks)
if (!file || !file[0]) {
    return res.status(400).json({ error: 'No File Provided' })
}
if (file[0].size > 5 * 1024 * 1024) {
    return res.status(400).json({ error: 'File size exceeds the limit of 5 MB.' })
}