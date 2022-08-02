import * as sharp from 'sharp';
import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';

const editPicture = async (
  req: express.Request,
  res: express.Response,
  next: Function
) => {
  const filename = req.query.filename as unknown as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  try {
    if (
      fs.existsSync(
        `${path.resolve(
          __dirname,
          '..',
          '..',
          `${filename}-${width}-${height}.jpg`
        )}`
      )
    ) {
      //Do Nothing
      console.log('Image already processed!');
      next();
    } else {
      console.log('Processing image');

      await processImage(filename, width, height);
    }
  } catch (err) {
    console.log('Caught error');
    res.send(
      'Error: Input filename not found or width and/or height is not numbers!'
    );
    return;
  }
  next();
};

const processImage = async (
  filename: string,
  width: number,
  height: number
): Promise<void> => {
  try {
    await sharp(`./full/${filename}.jpg`)
      .resize(width, height)
      .toFile(`${filename}-${width}-${height}.jpg`);
  } catch (err) {
    console.log('HEEERREEE');
    throw new Error(
      'Input filename not found or width and/or height is not numbers!'
    );
  }
};

export { editPicture, processImage };
