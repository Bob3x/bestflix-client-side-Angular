
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/myFlix-Angular/welcome",
    "route": "/myFlix-Angular"
  },
  {
    "renderMode": 2,
    "route": "/myFlix-Angular/welcome"
  },
  {
    "renderMode": 2,
    "route": "/myFlix-Angular/movies"
  },
  {
    "renderMode": 2,
    "route": "/myFlix-Angular/profile"
  },
  {
    "renderMode": 2,
    "redirectTo": "/myFlix-Angular/welcome",
    "route": "/myFlix-Angular/**"
  }
],
  assets: new Map([
['index.csr.html', {size: 8150, hash: '4eb77b96310ffcb913f1b3fb33d2dfae04d4d5b6354a13c2ec8d51405a60eb92', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)}], 
['index.server.html', {size: 1675, hash: '08f7966ce367fcade4d475ecfc1efb530c27d06fcf28584a2777852fd28f54b1', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}], 
['movies/index.html', {size: 29691, hash: '81817bb8ebb8d1b43bb9f3d38289e721e084f69c36a344c15092188e597a7d00', text: () => import('./assets-chunks/movies_index_html.mjs').then(m => m.default)}], 
['profile/index.html', {size: 94337, hash: '9ec1c9932d8f3a745248eef3e905ca6d91e1bd57b994f8e19f9ff1cdade38cad', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)}], 
['welcome/index.html', {size: 30938, hash: '9b6e5d896614ff77107ab61d95b356079cc230e2aa37cdb71f0b0a20c2782333', text: () => import('./assets-chunks/welcome_index_html.mjs').then(m => m.default)}], 
['styles-E7MZGFKC.css', {size: 7099, hash: 'sPTHma6wxy0', text: () => import('./assets-chunks/styles-E7MZGFKC_css.mjs').then(m => m.default)}]
]),
  locale: undefined,
};
