import next from 'next';
import { createServer } from 'http';
const app = next({ dev: false });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handler(req, res);
  }).listen(process.env.PORT || 80, (err) => {
    if (err) throw err;
    console.log(`> Server running on http://cellulenoire.fr:${process.env.PORT || 80}`);
  });
});
