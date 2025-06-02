
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  routes: [
  {
    "renderMode": 2,
    "route": "/welcome"
  },
  {
    "renderMode": 2,
    "route": "/movies"
  },
  {
    "renderMode": 2,
    "route": "/profile"
  },
  {
    "renderMode": 2,
    "redirectTo": "/welcome",
    "route": "/"
  },
  {
    "renderMode": 2,
    "redirectTo": "/welcome",
    "route": "/**"
  }
],
  assets: new Map([
['index.csr.html', {size: 8099, hash: '0a0f67634fd0d8b6d621a060bd5c226d236c4782ae939f52bd2e27b28c843a73', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)}], 
['index.server.html', {size: 1624, hash: 'd85f476c0bd8f8f7fc4efe46a9e088bf453f213f25eac3095701923e3c91f4f9', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}], 
['welcome/index.html', {size: 30950, hash: '5e86a7f0c5af8c95d307c42d37bf595b9276e3d634a58ce31c7fb41521510eef', text: () => import('./assets-chunks/welcome_index_html.mjs').then(m => m.default)}], 
['movies/index.html', {size: 29333, hash: '5238ce8e1d021588a792a152a5db0cc7602752d02695a5a2edada8fc7570d316', text: () => import('./assets-chunks/movies_index_html.mjs').then(m => m.default)}], 
['profile/index.html', {size: 93979, hash: 'dbfd898d1ffe0a811c34fe7d1e3bb2118e869f92da70aa23eb77bbbd182b78b2', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)}], 
['styles-SDGNXNM5.css', {size: 7099, hash: 'zLUQZpUw1Zg', text: () => import('./assets-chunks/styles-SDGNXNM5_css.mjs').then(m => m.default)}]
]),
  locale: undefined,
};
