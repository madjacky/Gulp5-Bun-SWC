import './_components.js';
import Logger from './components/test-esm-swc.js';

class Application {
  static main() {
    Logger.log('Hello SWC & Bun World from Gulp v5!!')
  }
}

Application.main();

console.log('Gulp v5 Gulp-Cli v3 Bun & SWC Loader');