/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import {
  bootstrapApplication,
  provideProtractorTestingSupport,
} from '@angular/platform-browser'
import { AppLogicComponent } from './src/app/app-logic-component/app-logic-component'

bootstrapApplication(AppLogicComponent, {
  providers: [provideProtractorTestingSupport()],
}).catch((err) => console.error(err))
