
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
['index.csr.html', {size: 8150, hash: '18880384320d1e9033227d0f0a7237b3f74f67f6085712c9b2cf85271c45317a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)}], 
['index.server.html', {size: 1675, hash: '2dcdd54ea768b17883f66c8eeed2c0127ad1e210eae105856706ae1d7a4b396a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}], 
['movies/index.html', {size: 29383, hash: 'c227411a7ca88184face63ccfe9ddba8f704e546b6196942b5b4f32652ee595c', text: () => import('./assets-chunks/movies_index_html.mjs').then(m => m.default)}], 
['welcome/index.html', {size: 31000, hash: 'deffe031d9f07f61b2a75d91c30fd83d6113ffe931e50b2925cad71765c32ae8', text: () => import('./assets-chunks/welcome_index_html.mjs').then(m => m.default)}], 
['profile/index.html', {size: 94031, hash: '9e11ab853c54db457723cfbeffe254171aa8ac4e29970413698fa2f21e07eb44', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)}], 
['styles-SDGNXNM5.css', {size: 7099, hash: 'zLUQZpUw1Zg', text: () => import('./assets-chunks/styles-SDGNXNM5_css.mjs').then(m => m.default)}]
]),
  locale: undefined,
};
