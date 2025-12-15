// Polyfill for `global` needed by sockjs-client
(window as any).global = window;

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

//  ADDED: Import for scroll restoration
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),

    //  ADDED: Router with automatic scroll-to-top
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',   //  Always start at top
      })
    )
  ]
})
.catch((err) => console.error(err));
