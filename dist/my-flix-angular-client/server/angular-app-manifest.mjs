
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
['index.csr.html', {size: 8135, hash: '01143e1dfc1f63afa8f5a0fdbcfc7414085c21ce229fc013234e9d1ca45a7bc3', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)}], 
['index.server.html', {size: 1660, hash: '34eaf2d28f844c223db29a95fbc0cc4df51b5138900ab240ed876e54ac1906dc', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}], 
['welcome/index.html', {size: 30985, hash: 'bceb8a74dce052623fd9e43cd9ae912e790015d29ed99ce2900831fd866e0c4a', text: () => import('./assets-chunks/welcome_index_html.mjs').then(m => m.default)}], 
['movies/index.html', {size: 29368, hash: '66fd767a85b6fa07763e5211fb51ca64b31dfbbac69b525379206fa901f4517f', text: () => import('./assets-chunks/movies_index_html.mjs').then(m => m.default)}], 
['profile/index.html', {size: 94014, hash: 'd48459338a2ae90ffdcc24f1a6b88936fbbe7bb67dda56f67a34f7539b62a315', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)}], 
['styles-SDGNXNM5.css', {size: 7099, hash: 'zLUQZpUw1Zg', text: () => import('./assets-chunks/styles-SDGNXNM5_css.mjs').then(m => m.default)}]
]),
  locale: undefined,
};
