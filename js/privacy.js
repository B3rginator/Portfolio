import { initNavigation } from './navigation.js';
import { CookieManager } from './cookie-manager.js';
import { initI18n } from './i18n.js';

initNavigation();
initI18n();
new CookieManager();