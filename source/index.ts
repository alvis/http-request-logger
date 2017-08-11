/**
 * -------------------------------------------------------------------------
 * @summary   HTTP Request Logger
 *            A handy tool to print http request information on stdout
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * -------------------------------------------------------------------------
 */

import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as jsyaml from 'js-yaml';

// specify the parameters
const PORT = process.env['PORT'] || 80; // the port to listen (Default: 80)

// create a listener app
const app = express();
app.use(bodyParser.raw());
app.use(cookieParser());
app.use((request, response, next) => {
  const ip = request.ip;
  const method = request.method;
  const url = request.url;
  const headers = request.headers;
  const body = request.body;

  const print = {
    time: new Date().toISOString(),
    ip,
    method,
    url,
    headers,
    cookies: request.cookies,
    body
  };

  console.log(`${jsyaml.dump(print)}---`);

  response.sendStatus(200);
  next();
});

app.listen(PORT, () => {
  console.log(`Start listening on port ${PORT}`);
});
