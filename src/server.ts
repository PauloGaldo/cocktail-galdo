import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { AngularNodeAppEngine, writeResponseToNodeResponse } from '@angular/ssr/node';
import { getContext } from '@netlify/angular-runtime/context.mjs';
import express from 'express';
import { join } from 'path';

const appEngine = new AngularAppEngine();
export async function netlifyAppEngineHandler(request: Request) {
  const context = getContext();
  return (await appEngine.handle(request, context)) ?? new Response('Not found', { status: 404 });
}
export const browserDistFolder = join(import.meta.dirname, '../browser');

// For local development
const app = express();
export const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the Express server for local development
 * Only runs when explicitly called from command line (not during build process)
 */
if (process.argv[1] && process.argv[1].includes('server.mjs')) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error?: Error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
// export const reqHandler = createNodeRequestHandler(app);
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);
