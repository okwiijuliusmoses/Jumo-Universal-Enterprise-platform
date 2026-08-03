global.window = {
  addEventListener: () => {},
  onerror: () => {},
  location: { origin: 'http://localhost' }
};
global.document = {
  addEventListener: () => {},
  getElementById: () => null
};
global.requestAnimationFrame = (cb) => cb();
import('./experience/gateway/app.js').then(() => console.log('Imports are OK!')).catch(e => console.error('Import failed:', e));
