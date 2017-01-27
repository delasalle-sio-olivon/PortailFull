//pour l'app web
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

//notre module AppModule
import { AppModule } from './app.module';

//l'entré est AppModule
platformBrowserDynamic().bootstrapModule(AppModule);
