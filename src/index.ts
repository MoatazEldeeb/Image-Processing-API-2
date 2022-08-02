import * as express from 'express';
import serve from './utils/servingBack';
import { editPicture } from './utils/imageResizing';

const app = express();
const port = 3000;

app.get(
  '/api/images',
  editPicture,
  serve,
  (req: express.Request, res: express.Response): void => {}
);

app.get('/api', (req: express.Request, res: express.Response): void => {
  res.send('Server working fine...');
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
