import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { UAParser } from 'ua-parser-js';
import * as Meta from 'express-metatag';

const ML = Meta('tags', true);

function isChrome(name: string): boolean {
  console.log('name:', name);
  return ['Chrome', 'Chrome Headless', 'Chrome WebView', 'Chromium'].indexOf(name) != -1
}

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/task334/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', 
    ML({
      'og:title': '#TASK334',
      'og:description': '140文字で管理する地上最ストイックなTODOアプリ。日本上陸！！',
      'og:image': 'https://task334.app/assets/ogp.png',
      'twitter:title': '#TASK334',
      'twitter:card': 'summary_large_image',
      'twitter:site': '@task334',
      'twitter:creator': '@nontangent',
      'twitter:description': '140文字で管理する地上最ストイックなTODOアプリ。日本上陸！！'
    }),
    (req, res, next) => {
      const uaParser = new UAParser(req.headers['user-agent']);
      if (
        uaParser.getDevice().type == undefined &&
        isChrome(uaParser.getBrowser().name)
      ) {
        res.redirect('https://chrome.google.com/webstore/detail/task334/cflanppcpbjbjekfpmfhnodjbpebelpm')
      } else {
        res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
      } 

    }
  );

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
