import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { getContext } from '@netlify/angular-runtime/context.mjs';

const app = new AngularAppEngine();
export async function netlifyAppEngineHandler(request: Request) {
  const context = getContext();
  return (await app.handle(request, context)) ?? new Response('Not found', { status: 404 });
}

export const reqHandler = createRequestHandler(netlifyAppEngineHandler);
