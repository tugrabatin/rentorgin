/**
 * Netlify Serverless Function Handler for NestJS
 * Wraps NestJS Express app for AWS Lambda/Netlify Functions
 */

import { createApp } from '../../apps/api/src/serverless';
import * as serverless from 'serverless-http';

let cachedApp: serverless.Handler;

export const handler = async (event: any, context: any) => {
  // Cache the app instance for better performance
  if (!cachedApp) {
    const expressApp = await createApp();
    cachedApp = serverless(expressApp, {
      binary: ['image/*', 'application/pdf', 'application/octet-stream'],
    });
  }
  
  // Ensure context.callbackWaitsForEmptyEventLoop is false for better performance
  context.callbackWaitsForEmptyEventLoop = false;
  
  return cachedApp(event, context);
};
