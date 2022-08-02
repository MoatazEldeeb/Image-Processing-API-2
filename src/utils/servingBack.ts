import * as express from 'express';
import { promises as fsPromises } from 'fs';

const serve = async (
  req: express.Request,
  res: express.Response,
  next: Function
): Promise<void> => {
  console.log('Serving Back');

  const filename = req.query.filename;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);
  const data = await fsPromises.readFile(`${filename}-${width}-${height}.jpg`);

  res.writeHead(200, { 'Content-Type': 'image/jpeg' });
  res.end(data);
};

export default serve;
