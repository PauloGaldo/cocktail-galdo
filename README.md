# [Galdo](https://galdo.com.ar/cocktail/list)

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.6 with Server-Side Rendering (SSR) support.

## Development server

### Client-side only development (CSR)

To start a local development server without SSR, run:

```bash
npm run serve:nssr:galdo
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Server-Side Rendering (SSR) development

To run the application with SSR in development mode:

1. First, build the application for production with SSR:
```bash
npm run build:ssr
```

2. Then start the SSR server:
```bash
npm run serve:ssr:galdo
```

The SSR application will be available at `http://localhost:4000/`.

### Alternative development without SSR

To run in development mode without SSR but using the serve configuration:

```bash
npm run serve:nssr:galdo
```

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

### Client-side build

To build the project for client-side only, run:

```bash
ng build
```

### SSR build

To build the project with Server-Side Rendering support, run:

```bash
npm run build:ssr
```

This will compile your project and store the build artifacts in the `dist/` directory. The SSR build includes both the client-side bundle and the server-side code for rendering on the server.

### Production deployment

For production deployment with SSR:

1. Build the application:
```bash
npm run build:ssr
```

2. Start the production server:
```bash
npm run serve:ssr:galdo
```

The application will be served with server-side rendering capabilities, improving SEO and initial page load performance.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Available Scripts

- `npm start` - Start development server (client-side only)
- `npm run build` - Build for production (client-side only)
- `npm run build:ssr` - Build with Server-Side Rendering
- `npm run serve:ssr:galdo` - Serve SSR build locally
- `npm run serve:nssr:galdo` - Serve without SSR in development
- `npm test` - Run unit tests
- `npm run watch` - Build in watch mode for development

## SSR Features

This project includes:
- **Server-Side Rendering (SSR)** for improved SEO and initial page load performance
- **Express.js server** for handling server-side requests
- **Angular Universal** integration for seamless SSR experience
- **Production-ready** SSR configuration

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

For Angular SSR documentation, visit the [Angular SSR Guide](https://angular.dev/guide/ssr).
