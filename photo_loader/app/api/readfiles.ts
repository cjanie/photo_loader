import fs from 'fs'
import path from 'path'
import {Request, Response} from 'express';

export default (req: Request, res: Response) => {
  const dirRelativeToPublicFolder = 'img'

  const dir = path.resolve('./public', dirRelativeToPublicFolder);

  const filenames = fs.readdirSync(dir);

  const images = filenames.map(name => path.join('/', dirRelativeToPublicFolder, name))

  res.statusCode = 200
  res.json(images);
}
