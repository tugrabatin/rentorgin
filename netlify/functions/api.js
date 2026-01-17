/**
 * Netlify Serverless Function Handler for NestJS
 * Wraps NestJS Express app for AWS Lambda/Netlify Functions
 * Using CommonJS to avoid esbuild bundling issues
 */

// Path to compiled serverless module
const { createApp } = require('../../apps/api/dist/src/serverless');
const serverless = require('serverless-http');

let cachedApp;

exports.handler = async (event, context) => {
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
