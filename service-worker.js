/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "ec7260c67bcaa61dc277abf94ef44b6f"
  },
  {
    "url": "assets/css/0.styles.04d71374.css",
    "revision": "7fd9c4929624160d395d6f917bd8d3a4"
  },
  {
    "url": "assets/img/async.8869f199.png",
    "revision": "8869f1998e6c7211ad52f360146f83f8"
  },
  {
    "url": "assets/img/cookie-result-01.a2f8d237.png",
    "revision": "a2f8d237c859c373b5199f26ef290e47"
  },
  {
    "url": "assets/img/debug-result-001.c1c9cb8b.png",
    "revision": "c1c9cb8b0e986159b3b7fee0102feb7a"
  },
  {
    "url": "assets/img/debug-result-002.cbdc9f49.png",
    "revision": "cbdc9f49a73946c50099ceec4a223547"
  },
  {
    "url": "assets/img/debug-result-004.e04cba67.png",
    "revision": "e04cba673cb3a116d3ec3a5436c65a82"
  },
  {
    "url": "assets/img/debug-result-005.b58632fc.png",
    "revision": "b58632fc140fb91607173f60f2948bd8"
  },
  {
    "url": "assets/img/debug-result-006.d34cb585.png",
    "revision": "d34cb5857e436d7178038bfa5bca38a4"
  },
  {
    "url": "assets/img/debug-result-007.7808a7f2.png",
    "revision": "7808a7f25c106080a17e45a96b85846e"
  },
  {
    "url": "assets/img/debug-result-008.6db33e88.png",
    "revision": "6db33e880542893fcc76bf105e7473c2"
  },
  {
    "url": "assets/img/jsonp-result-01.52a321b6.png",
    "revision": "52a321b63244106779a52fd9b021606b"
  },
  {
    "url": "assets/img/jsonp-result-02.8053e745.png",
    "revision": "8053e745dc75cd77ad2438014bfcca1e"
  },
  {
    "url": "assets/img/jsonp-wiki.4dc57e7c.png",
    "revision": "4dc57e7c1d3a946b075836f2315ef2fe"
  },
  {
    "url": "assets/img/jwt.989a49ef.png",
    "revision": "989a49efeb9fb4b2bd13e874f26e07c0"
  },
  {
    "url": "assets/img/mysql-init-result-01.4a39c870.png",
    "revision": "4a39c870f174ed39c5b9f14e7687aeef"
  },
  {
    "url": "assets/img/mysql-init-result-02.ed13a703.png",
    "revision": "ed13a703f902029332f66d230eba10a6"
  },
  {
    "url": "assets/img/project-result-00.a12f59c9.png",
    "revision": "a12f59c9aac64a06694285ac291f1e83"
  },
  {
    "url": "assets/img/project-result-01.7864a550.png",
    "revision": "7864a550c32d8ceb31e8c6414af5bfc5"
  },
  {
    "url": "assets/img/project-result-02.d31821b8.png",
    "revision": "d31821b8a7df0c3f287fd182967576cd"
  },
  {
    "url": "assets/img/request-get.731f7abf.png",
    "revision": "731f7abfe15b46ba2b1b196674f86527"
  },
  {
    "url": "assets/img/request-post-form.281c217d.png",
    "revision": "281c217d9f9cca659059067e6409e0fc"
  },
  {
    "url": "assets/img/request-post-result.3037e1ce.png",
    "revision": "3037e1cec3d8968bbee519191353e766"
  },
  {
    "url": "assets/img/route-result-01.ad7c6df9.png",
    "revision": "ad7c6df9ccb989b868d14ee512ab15cc"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/session-result-01.57116136.png",
    "revision": "5711613607515f6d827cc59cb5967bbd"
  },
  {
    "url": "assets/img/session-result-02.16f1ad16.png",
    "revision": "16f1ad16a64b0616bd5da6fa12d220c4"
  },
  {
    "url": "assets/img/session-result-03.01a0ccd1.png",
    "revision": "01a0ccd1db42105f4c20dcc7bb2becc6"
  },
  {
    "url": "assets/img/session.d9af5647.png",
    "revision": "d9af56471575aa091565effcf2c06e15"
  },
  {
    "url": "assets/img/session2.9db60093.png",
    "revision": "9db60093ca9b80c6018f18d935c3ccd9"
  },
  {
    "url": "assets/img/sha.b6a155ed.png",
    "revision": "b6a155ed8eabd79402ae271207eb6824"
  },
  {
    "url": "assets/img/start-result-01.b2e9bed6.png",
    "revision": "b2e9bed6543a307e74f5791a692eb7f3"
  },
  {
    "url": "assets/img/static-server-result-01.41418ff5.png",
    "revision": "41418ff57453c00b311792c6dfccfe27"
  },
  {
    "url": "assets/img/static-server-result-02.3c44a239.png",
    "revision": "3c44a239a3bde6e4c6dda7f12c89b13f"
  },
  {
    "url": "assets/img/static-server-result-03.53c88774.png",
    "revision": "53c88774b69d5db6f0c11a13dadce885"
  },
  {
    "url": "assets/img/test-unit-result-01.26c6e3fb.png",
    "revision": "26c6e3fbde00292a21fbfa3ffbfc79d4"
  },
  {
    "url": "assets/img/test-unit-result-03.e6e0ac18.png",
    "revision": "e6e0ac18c31ffb12d4bb3b3d50f36001"
  },
  {
    "url": "assets/img/token.91d0af4c.png",
    "revision": "91d0af4c6d928f06e345b2a30c4b980b"
  },
  {
    "url": "assets/img/token2.529aab5c.png",
    "revision": "529aab5c6b0b4d225fbcc7c1cd049b3b"
  },
  {
    "url": "assets/img/upload-async-result-01.0406e6d6.png",
    "revision": "0406e6d682d25eda88233fcbe9ba659e"
  },
  {
    "url": "assets/img/upload-simple-result-01.28198536.png",
    "revision": "28198536749c9a501b7cb88266f83dde"
  },
  {
    "url": "assets/img/upload-simple-result-02.954eb399.png",
    "revision": "954eb3991221be37a064dd56819b2864"
  },
  {
    "url": "assets/img/upload-simple-result-03.bc8ad88a.png",
    "revision": "bc8ad88a81ea9b4974a47d0617169eee"
  },
  {
    "url": "assets/img/upload-simple-result-04.9058935d.png",
    "revision": "9058935d1ddb059d4543c3dee4d23b55"
  },
  {
    "url": "assets/js/10.1df831e5.js",
    "revision": "a39339dc9de58fe89d490253d8d549a8"
  },
  {
    "url": "assets/js/100.faed81e1.js",
    "revision": "bf220aaa5ca3e06719bd1a8209ed3ce4"
  },
  {
    "url": "assets/js/101.4ca9de43.js",
    "revision": "a1df89506a36e32309d9017c638ea5d8"
  },
  {
    "url": "assets/js/102.bed33a4e.js",
    "revision": "458ccb31c82e50150a3edbc5fb0e70f2"
  },
  {
    "url": "assets/js/103.47cfeeb4.js",
    "revision": "4168cc0221c8768a51234ff16c108191"
  },
  {
    "url": "assets/js/104.99382f62.js",
    "revision": "959479f577c778d60e5928713ee69fa0"
  },
  {
    "url": "assets/js/105.a09c57ad.js",
    "revision": "1d20b9513f8ef7b700472da68763ae65"
  },
  {
    "url": "assets/js/106.e0e65ae5.js",
    "revision": "c2be67fd65f08e9a07bdb14c11d17cbf"
  },
  {
    "url": "assets/js/107.006157e7.js",
    "revision": "6a923d719c4226acc70bdf3b9b85c074"
  },
  {
    "url": "assets/js/11.6d248a1f.js",
    "revision": "66a2b9d6b2fcf48cbb60168551d46e2b"
  },
  {
    "url": "assets/js/12.089b9acc.js",
    "revision": "5197f4e8fd17cd1b6c8d1520a7f2343a"
  },
  {
    "url": "assets/js/13.7503e5c6.js",
    "revision": "2ea7751b90764fbbb89c2be8fb493187"
  },
  {
    "url": "assets/js/14.ea26514e.js",
    "revision": "643e9bc9937fd677d51963b89b8690d3"
  },
  {
    "url": "assets/js/15.6f7e5a72.js",
    "revision": "47c407f5371d9622f34821bd0ed22ec2"
  },
  {
    "url": "assets/js/16.15f31946.js",
    "revision": "b6dfb86258ca25b99dbb96c8c873bda2"
  },
  {
    "url": "assets/js/17.546f352d.js",
    "revision": "21905dc74810a5c988c70efc87ed5e76"
  },
  {
    "url": "assets/js/18.43cadce8.js",
    "revision": "b790aba6b0c1eb613824e08bcaa3dd25"
  },
  {
    "url": "assets/js/19.20c00e37.js",
    "revision": "bf5c01706900b363f5c8144012b8f984"
  },
  {
    "url": "assets/js/20.d4bd9d39.js",
    "revision": "fd99ed5373deec26dc8b90a3a1ee85ef"
  },
  {
    "url": "assets/js/21.147d3198.js",
    "revision": "fe130af33697df0d1f188d5aa156dd00"
  },
  {
    "url": "assets/js/22.822af822.js",
    "revision": "f7d146dc29416bbf51bffa845ba32583"
  },
  {
    "url": "assets/js/23.ad0f4e46.js",
    "revision": "61192b7d5c6fc8f1951fd1a34925057f"
  },
  {
    "url": "assets/js/24.4ed1364a.js",
    "revision": "86bf7f8ea1e1f3e03bd6e8236072f9d2"
  },
  {
    "url": "assets/js/25.e8be0e71.js",
    "revision": "dcd0c7dbf4d210c6e9cbe712790baf86"
  },
  {
    "url": "assets/js/26.a4b68f4e.js",
    "revision": "4907e2addf4314eebec0867fc7e0d2cc"
  },
  {
    "url": "assets/js/27.eaeaac83.js",
    "revision": "84b7c7d14c27783afdb48c9ad209edfd"
  },
  {
    "url": "assets/js/28.ce8ab57d.js",
    "revision": "f34b8eb335ee97e52e6e45b9c52305aa"
  },
  {
    "url": "assets/js/29.0b3e19ed.js",
    "revision": "269c204311447a4a7eb5ee093d1fea13"
  },
  {
    "url": "assets/js/30.409d36e7.js",
    "revision": "6cf3b8c33d58edd1030ae5c1551099aa"
  },
  {
    "url": "assets/js/31.dc762526.js",
    "revision": "2a9c0f08675f6b8fa2f1047d5f64b8e0"
  },
  {
    "url": "assets/js/32.05ff8283.js",
    "revision": "66d7d620a96285f2b2fadb88e3e1f9c9"
  },
  {
    "url": "assets/js/33.b095bc5b.js",
    "revision": "f59e03b1d3015cef8904d96e6ddbe3b8"
  },
  {
    "url": "assets/js/34.ec57608e.js",
    "revision": "dbe06c74b1171fe256f5e5222d981c28"
  },
  {
    "url": "assets/js/35.5f3ea3ae.js",
    "revision": "3155865898f0c86dd03e028f61dd6cb2"
  },
  {
    "url": "assets/js/36.ef51b036.js",
    "revision": "e16fcf9a14be730344a8ba15b86608ab"
  },
  {
    "url": "assets/js/37.8351c418.js",
    "revision": "8badd4e42057e96a69393a56991610c1"
  },
  {
    "url": "assets/js/38.a20ee99d.js",
    "revision": "27dd528dbfd377f34d3f08c7846bd112"
  },
  {
    "url": "assets/js/39.88094c54.js",
    "revision": "dbc71b252d510b93c306250c60030358"
  },
  {
    "url": "assets/js/4.cbb566af.js",
    "revision": "8f3c0e8878f341701c0cb3a598c92242"
  },
  {
    "url": "assets/js/40.084cc24a.js",
    "revision": "4a286dfd7cd9aa71ad662f25ffaa5de1"
  },
  {
    "url": "assets/js/41.ceec190d.js",
    "revision": "0cc82f04959d579d0a637dcfa2e2373c"
  },
  {
    "url": "assets/js/42.310c61ee.js",
    "revision": "7444a5dec313d908eb56eeb9883896de"
  },
  {
    "url": "assets/js/43.5b70b2d9.js",
    "revision": "4f597010cf58a8b792e73eba476afa60"
  },
  {
    "url": "assets/js/44.060a5dcd.js",
    "revision": "35dca14c1bb264e68d74556dad699bef"
  },
  {
    "url": "assets/js/45.8363b81b.js",
    "revision": "ed7c0bd170493ff43e091e652fba6a21"
  },
  {
    "url": "assets/js/46.4397f3e0.js",
    "revision": "c8474ab163c3a136366439e5db947bff"
  },
  {
    "url": "assets/js/47.2ea413fc.js",
    "revision": "8b0b3988b783d22274e84ed51b293ee2"
  },
  {
    "url": "assets/js/48.aa2c07fb.js",
    "revision": "8c23e12704c9b804ea5bd9d7e4806130"
  },
  {
    "url": "assets/js/49.14a61d03.js",
    "revision": "e291d2396ef3edef225afe1e77af6ed0"
  },
  {
    "url": "assets/js/5.36c9e133.js",
    "revision": "6187bda6a90ca40241daf993a96949f3"
  },
  {
    "url": "assets/js/50.eb271fd9.js",
    "revision": "cf2446f82a6029a679c5c4513c93609d"
  },
  {
    "url": "assets/js/51.bc775c5f.js",
    "revision": "534411ed553a4f33550cde2b970dd455"
  },
  {
    "url": "assets/js/52.fa54eb4e.js",
    "revision": "87667b69441feca154e22b4e82de789e"
  },
  {
    "url": "assets/js/53.1ee619d8.js",
    "revision": "85729408aff306bf06c3d6d9a20bb5df"
  },
  {
    "url": "assets/js/54.5d6b9ae6.js",
    "revision": "f150984cc96f30875c889f03a105a88c"
  },
  {
    "url": "assets/js/55.1d902dc8.js",
    "revision": "e296a8417f8a30625e3532a73b41d883"
  },
  {
    "url": "assets/js/56.35cf11c3.js",
    "revision": "9c338ff99ead81d340f3cbe0cd04d652"
  },
  {
    "url": "assets/js/57.a9d87e28.js",
    "revision": "f851e060b268eca483b316091d977a9c"
  },
  {
    "url": "assets/js/58.002141b4.js",
    "revision": "6967aebb5c09e767462fc4bb4da01bfa"
  },
  {
    "url": "assets/js/59.b81489d4.js",
    "revision": "4527463b6cb9edf8ad3e392e54fe6028"
  },
  {
    "url": "assets/js/6.58217116.js",
    "revision": "97bae3e5e5b568d2c8b152d691a700ae"
  },
  {
    "url": "assets/js/60.c35e60a8.js",
    "revision": "ef13839e86365ae17f07953b88a3817e"
  },
  {
    "url": "assets/js/61.f822b13d.js",
    "revision": "91f3cbb7c99814e79df1799c6ab9a314"
  },
  {
    "url": "assets/js/62.485b4012.js",
    "revision": "d5f4e15f0186fd296c33e069de31a085"
  },
  {
    "url": "assets/js/63.c7c2b6b5.js",
    "revision": "5647c2c450d477dba98a22ed59192f79"
  },
  {
    "url": "assets/js/64.5d43709b.js",
    "revision": "83ac729ad083ae9351139c590076669b"
  },
  {
    "url": "assets/js/65.b611bc8d.js",
    "revision": "d264ee0a0f6d179acdcdb09b386d8212"
  },
  {
    "url": "assets/js/66.59d2a614.js",
    "revision": "f43c7445bb568727186d487a08c289f3"
  },
  {
    "url": "assets/js/67.05e9a058.js",
    "revision": "1d78231ff1886993a727d615e2b1b1af"
  },
  {
    "url": "assets/js/68.0b86b935.js",
    "revision": "166971dad32f5cfdb50846ed5be7ee5a"
  },
  {
    "url": "assets/js/69.8c93eaf6.js",
    "revision": "46d5e8cdbab04becda26900180f308a2"
  },
  {
    "url": "assets/js/7.9ed243c7.js",
    "revision": "7ed9fa22a18c4416e493d877aaddc22a"
  },
  {
    "url": "assets/js/70.177565f8.js",
    "revision": "c9989b1bd6c3897645992944e9db9dd5"
  },
  {
    "url": "assets/js/71.617d61d2.js",
    "revision": "723aa3c543c11cab13462a8f622cb836"
  },
  {
    "url": "assets/js/72.cda5cf3a.js",
    "revision": "1d64a69502c5993c552a8b7291ad22a9"
  },
  {
    "url": "assets/js/73.2201f15f.js",
    "revision": "a09f16fc2c431ab44a088ae7b5d22878"
  },
  {
    "url": "assets/js/74.5aad0673.js",
    "revision": "4ed3da048d3263d300e2ebdf0fe28855"
  },
  {
    "url": "assets/js/75.05e9ddf5.js",
    "revision": "f1c25a503eb023ba388f606edcaba685"
  },
  {
    "url": "assets/js/76.909eda7b.js",
    "revision": "83e4cdcd51a54bc7493959f3acd8c1fe"
  },
  {
    "url": "assets/js/77.d9e10d0d.js",
    "revision": "6b84b67c2632d1c19b5ad88e2e4e6bc4"
  },
  {
    "url": "assets/js/78.e3ab5082.js",
    "revision": "f8282617256a8ef5bd9116c1aa25ee91"
  },
  {
    "url": "assets/js/79.6bea4726.js",
    "revision": "d808f9ee0bc4754083467992bfd6c6b0"
  },
  {
    "url": "assets/js/8.5121c136.js",
    "revision": "f33ab27aea7e1168e5971cdf837853ef"
  },
  {
    "url": "assets/js/80.2b3a46e0.js",
    "revision": "b7069a001f21ce8ec9535394b5d476b5"
  },
  {
    "url": "assets/js/81.d8a2b86a.js",
    "revision": "03bcc50b4e01d789a5b69cdc758ee61a"
  },
  {
    "url": "assets/js/82.59884135.js",
    "revision": "56ac34bd3683f5208f2eb32ae3aaa457"
  },
  {
    "url": "assets/js/83.7dd235af.js",
    "revision": "202b6022d2ecf9ed6a5ed9e153d1cd6b"
  },
  {
    "url": "assets/js/84.75f51e4b.js",
    "revision": "300b77452a0b7d7ce56b2260a7d9b25d"
  },
  {
    "url": "assets/js/85.6b0d363d.js",
    "revision": "4fca7612e5a3d747831dee55116c6554"
  },
  {
    "url": "assets/js/86.011fd32a.js",
    "revision": "68babe57bc7a96ae7cf93c5dca5aa695"
  },
  {
    "url": "assets/js/87.649522e0.js",
    "revision": "7ea9d6ff491db0b59c338630213af46d"
  },
  {
    "url": "assets/js/88.d60b555e.js",
    "revision": "32ca74ca7994bdcdf77d4c5a6a2c2b7c"
  },
  {
    "url": "assets/js/89.b09d6659.js",
    "revision": "c36a530494a2d121d6c771517c3dd474"
  },
  {
    "url": "assets/js/9.c39e9c7d.js",
    "revision": "3e66ebafde859e630fafb0aa3fd8ab4a"
  },
  {
    "url": "assets/js/90.bdd3e393.js",
    "revision": "219715cf062f972aaa0b7634d71d84aa"
  },
  {
    "url": "assets/js/91.4c084abf.js",
    "revision": "9ad3706916649642cd8318c8c9bb74cc"
  },
  {
    "url": "assets/js/92.8751acf1.js",
    "revision": "0d7ff8e36bcc8c7533ca4054835efc15"
  },
  {
    "url": "assets/js/93.7c5d406d.js",
    "revision": "00ef04a4a5dc9375760e762ffa8daee6"
  },
  {
    "url": "assets/js/94.9cbbda26.js",
    "revision": "809118753eb3961cb670e97750feed89"
  },
  {
    "url": "assets/js/95.9d6d64b9.js",
    "revision": "4fc4c1a5ea5eeebe21569ac7d0379d2c"
  },
  {
    "url": "assets/js/96.1f58d5ae.js",
    "revision": "0edc2f2cf73ff23376c03d5f5d9759cf"
  },
  {
    "url": "assets/js/97.24de5796.js",
    "revision": "81dc10bf5ac1793746a022da9ebcd866"
  },
  {
    "url": "assets/js/98.81ff5119.js",
    "revision": "e94ebb7f0f34a8b7a5f08071f78ee296"
  },
  {
    "url": "assets/js/99.047c4c86.js",
    "revision": "191e3c4d068e9b8f1925cb183bf4c62f"
  },
  {
    "url": "assets/js/app.06995101.js",
    "revision": "9d23a2e277cb435e244a1c7b5264495a"
  },
  {
    "url": "assets/js/vendors~docsearch.73734a07.js",
    "revision": "b16cd09750ce0665a6bcf69449f899d3"
  },
  {
    "url": "assets/js/vendors~notification.c14938e7.js",
    "revision": "d896324a20612995cd7c249cf27e540c"
  },
  {
    "url": "icons/android-chrome-192x192.png",
    "revision": "f130a0b70e386170cf6f011c0ca8c4f4"
  },
  {
    "url": "icons/android-chrome-512x512.png",
    "revision": "0ff1bc4d14e5c9abcacba7c600d97814"
  },
  {
    "url": "icons/apple-touch-icon-120x120.png",
    "revision": "936d6e411cabd71f0e627011c3f18fe2"
  },
  {
    "url": "icons/apple-touch-icon-152x152.png",
    "revision": "1a034e64d80905128113e5272a5ab95e"
  },
  {
    "url": "icons/apple-touch-icon-180x180.png",
    "revision": "c43cd371a49ee4ca17ab3a60e72bdd51"
  },
  {
    "url": "icons/apple-touch-icon-60x60.png",
    "revision": "9a2b5c0f19de617685b7b5b42464e7db"
  },
  {
    "url": "icons/apple-touch-icon-76x76.png",
    "revision": "af28d69d59284dd202aa55e57227b11b"
  },
  {
    "url": "icons/apple-touch-icon.png",
    "revision": "66830ea6be8e7e94fb55df9f7b778f2e"
  },
  {
    "url": "icons/favicon-16x16.png",
    "revision": "4bb1a55479d61843b89a2fdafa7849b3"
  },
  {
    "url": "icons/favicon-32x32.png",
    "revision": "98b614336d9a12cb3f7bedb001da6fca"
  },
  {
    "url": "icons/msapplication-icon-144x144.png",
    "revision": "b89032a4a5a1879f30ba05a13947f26f"
  },
  {
    "url": "icons/mstile-150x150.png",
    "revision": "058a3335d15a3eb84e7ae3707ba09620"
  },
  {
    "url": "icons/safari-pinned-tab.svg",
    "revision": "f22d501a35a87d9f21701cb031f6ea17"
  },
  {
    "url": "index.html",
    "revision": "146406cb4b7bea22c680113de32c9cc8"
  },
  {
    "url": "logo.png",
    "revision": "736ab2ad735e2b92e0b74ba0ca36ca7a"
  },
  {
    "url": "logo.svg",
    "revision": "193a730d0b1344fdbbbcd2c9cd733edc"
  },
  {
    "url": "notes/advance/-5分钟入门非对称加密用法.html",
    "revision": "4490407246fa2acc14f873254dccd487"
  },
  {
    "url": "notes/advance/-cluster.html",
    "revision": "70cf0de114672ed6ac09f6e755337015"
  },
  {
    "url": "notes/advance/-cookie_parser深入.html",
    "revision": "21ec15d29e6d7c1290976182045c7726"
  },
  {
    "url": "notes/advance/-crypto模块之理论篇.html",
    "revision": "ba7bf5ca61334a552034bfc47fa1cd07"
  },
  {
    "url": "notes/advance/-express+cookie_parser：签名机制深入剖析.html",
    "revision": "7b49af018466ad46f59334eb408aaf94"
  },
  {
    "url": "notes/advance/-express+session实现简易身份认证.html",
    "revision": "64c9edf51dac3adb28bc4918e6c01ef4"
  },
  {
    "url": "notes/advance/-https.html",
    "revision": "93395a3df5ab156ac2fed227e8a1326e"
  },
  {
    "url": "notes/advance/-log4js入门实例.html",
    "revision": "28e91b77d8a2f6e5e1e6398817f60cbe"
  },
  {
    "url": "notes/advance/-node8_napi.html",
    "revision": "adab5c9a11e7317100ce01b03cb4d744"
  },
  {
    "url": "notes/advance/-使用 async 控制并发.html",
    "revision": "08414e952ff6c59e098f5fe0726e088a"
  },
  {
    "url": "notes/advance/-使用 eventproxy 控制并发.html",
    "revision": "e6cbd961f578e4671bcda2f067e01a53"
  },
  {
    "url": "notes/advance/-使用 superagent 与 cheerio 完成简单爬虫.html",
    "revision": "4df3b692f32685ddfe7b6d89ae605d09"
  },
  {
    "url": "notes/advance/-基于express+muter的文件上传.html",
    "revision": "23546a34d4c7016a4dace6cf5e34a8ed"
  },
  {
    "url": "notes/advance/-将图片转成datauri嵌入到html.html",
    "revision": "dcbd3f0497a1e47b6734d65faa11d77e"
  },
  {
    "url": "notes/advance/-常用中间件 body_parser 实现解析.html",
    "revision": "028f11f6e2d49588e746a7f6e4798714"
  },
  {
    "url": "notes/advance/-日志模块morgan.html",
    "revision": "904205a08d36eae57007b4e7d19ed3e9"
  },
  {
    "url": "notes/advance/-服务端字符编解码&乱码处理 charset_enc_dec.html",
    "revision": "d53e7bb85278a318631ce4ea0cf87edb"
  },
  {
    "url": "notes/advance/-测试用例：mocha，should，istanbul.html",
    "revision": "d5d89b477bf96eebbb5b09160b897301"
  },
  {
    "url": "notes/advance/-调试日志打印：debug模块.html",
    "revision": "1976e50d2c8c1b80ddec4b1042744f94"
  },
  {
    "url": "notes/base/01-环境搭建.html",
    "revision": "610ec040897023bd69218d3f55cbdfc2"
  },
  {
    "url": "notes/base/02-node部署.html",
    "revision": "e1b804d27f2b0d480ed2ce7a1215ee9e"
  },
  {
    "url": "notes/base/03-基础应用.html",
    "revision": "ab723c9a9a13aa699bf29898b8711448"
  },
  {
    "url": "notes/express/-1.1 Express概览篇.html",
    "revision": "f2be443ed27110dd0fa2da84512f4ec1"
  },
  {
    "url": "notes/express/-1.2 Express.html",
    "revision": "f3e246a6491fd33262e40a94b374ba40"
  },
  {
    "url": "notes/index.html",
    "revision": "ba8ab415d8d30c03d89f38a6ef00e05d"
  },
  {
    "url": "notes/koa2/-1.0 koa2概览篇.html",
    "revision": "e1c8425030c2e90ce2cecbedc29d0d20"
  },
  {
    "url": "notes/koa2/-1.1 快速开始.html",
    "revision": "076e5fef9133956a769674c9bef5b9e2"
  },
  {
    "url": "notes/koa2/-1.2 async await使用.html",
    "revision": "9b238ccd0218394e2aa89f23a5e1c6c5"
  },
  {
    "url": "notes/koa2/-1.3 koa2简析结构.html",
    "revision": "c0e7e229796c547fd266027fd56a7453"
  },
  {
    "url": "notes/koa2/-1.4 koa中间件开发与使用.html",
    "revision": "ea7173fe3309fd9e494d4a0be82bf7e3"
  },
  {
    "url": "notes/koa2/-10.1 单元测试.html",
    "revision": "e54b8e33588a3654852f5c895d9bcbe8"
  },
  {
    "url": "notes/koa2/-11.1 开发debug.html",
    "revision": "1809d9bf46c257dacca371974cbc393e"
  },
  {
    "url": "notes/koa2/-12.1 快速启动.html",
    "revision": "f1b9fc73e6a859017b4aed7ffdfe9dd9"
  },
  {
    "url": "notes/koa2/-12.2 框架设计.html",
    "revision": "254de7f51a8bce3b55b5df8a2b0f4436"
  },
  {
    "url": "notes/koa2/-12.3 分层操作.html",
    "revision": "5c52cfcfb9595dfef395e17ffdcd5df4"
  },
  {
    "url": "notes/koa2/-12.4 数据库设计.html",
    "revision": "0b03c74c2a7bebb1f82cfa3304c9f333"
  },
  {
    "url": "notes/koa2/-12.5 路由设计.html",
    "revision": "2c7e376db76cd7b0fa193090582eed66"
  },
  {
    "url": "notes/koa2/-12.6 webpack4环境搭建.html",
    "revision": "ba79df2fd5fd2a7e19fd38a4e6f13c26"
  },
  {
    "url": "notes/koa2/-12.7 使用react.html",
    "revision": "b5043e1b4e037550b72984f68ecb5107"
  },
  {
    "url": "notes/koa2/-12.8 登录注册功能实现.html",
    "revision": "6980360798637fee8e1019eaefc4c8bd"
  },
  {
    "url": "notes/koa2/-12.9 session登录态判断处理.html",
    "revision": "3ba74b756a27209a6905958c8577f77b"
  },
  {
    "url": "notes/koa2/-13.1 import export使用.html",
    "revision": "2886625cdcccb1790a707913107e5abb"
  },
  {
    "url": "notes/koa2/-2.1 原生koa2实现路由.html",
    "revision": "88dfd7a20ba2120b9f0e37fb3b5f0d4f"
  },
  {
    "url": "notes/koa2/-2.2 koa router中间.html",
    "revision": "7298a16da5eb46eb79a47b0f0d739274"
  },
  {
    "url": "notes/koa2/-3.1 GET请求数据获取.html",
    "revision": "5875301967d0eb838d09e73eac67f02f"
  },
  {
    "url": "notes/koa2/-3.2 POST请求数据获取.html",
    "revision": "d5a316a454c7b94e952e718b601a9115"
  },
  {
    "url": "notes/koa2/-3.3 koa bodyparser中间件.html",
    "revision": "2ebbfa528c327d6014780540794ce020"
  },
  {
    "url": "notes/koa2/-4.1 原生koa2实现静态资源服务器.html",
    "revision": "ab63c113fcac96a6a93c1b2aa2dcc3e7"
  },
  {
    "url": "notes/koa2/-4.2 koa static中间件.html",
    "revision": "1d25e3b0ca0402bf24c808ef53443b57"
  },
  {
    "url": "notes/koa2/-5.1 koa2使用cookie.html",
    "revision": "ce0dc5f66f2141b3ac96a1225311ca8b"
  },
  {
    "url": "notes/koa2/-5.2 koa2实现session.html",
    "revision": "b8f2fe465deb6502d18cb002901ae25e"
  },
  {
    "url": "notes/koa2/-6.1 koa2加载模板引擎.html",
    "revision": "141a4a54bc389461da7802156f8c41c3"
  },
  {
    "url": "notes/koa2/-6.2 ejs模板引擎.html",
    "revision": "3e556e8680764156e3af6c83fe3ddb0d"
  },
  {
    "url": "notes/koa2/-7.1 busboy模块.html",
    "revision": "6a6a9b3a2d5b6ececdbc191d73a657f8"
  },
  {
    "url": "notes/koa2/-7.2 上传文件简单实现.html",
    "revision": "454de2799b19cbf0f13e3801d6934830"
  },
  {
    "url": "notes/koa2/-7.3 异步上传图片实现.html",
    "revision": "c358b9812ca410cb30d86ac8db758a88"
  },
  {
    "url": "notes/koa2/-8.1 mysql模块.html",
    "revision": "e566630af8fc4e1e47fff0cfdda62982"
  },
  {
    "url": "notes/koa2/-8.2 async await封装使用mysql.html",
    "revision": "db640a56614c18d5a69f785ebc547ce5"
  },
  {
    "url": "notes/koa2/-8.3 项目建表初始化.html",
    "revision": "e72fcf3564eb465515843ed2cd243e89"
  },
  {
    "url": "notes/koa2/-9.1 原生koa2实现JSONP.html",
    "revision": "68513a94dbee562da1814e7b38afef73"
  },
  {
    "url": "notes/koa2/-9.2 koa jsonp中间件.html",
    "revision": "a09062fa4359e519ff142326084b8d7b"
  },
  {
    "url": "notes/modules/-1.0 本地路径处理 path.html",
    "revision": "110c547ce8b6d9efc698c13a32039e1c"
  },
  {
    "url": "notes/modules/-2.0 文件系统操作 fs.html",
    "revision": "b0ac722d2cc2de0d99b9e2e8040ec046"
  },
  {
    "url": "notes/modules/-3.1 基础调试 console.html",
    "revision": "5165d2870108ac4c288a1e78a5bd2e1c"
  },
  {
    "url": "notes/modules/-3.2 本地调试远程服务器上的Node代码.html",
    "revision": "5ef336e2686b84b341f94c4c95eaad53"
  },
  {
    "url": "notes/modules/-4.1 网络服务 http.html",
    "revision": "cde436f1b960add86a858971976ed500"
  },
  {
    "url": "notes/modules/-4.2 网络服务 http res.html",
    "revision": "9ff23fba64437a137c75d43a63c7975c"
  },
  {
    "url": "notes/modules/-4.3 网络服务 http req.html",
    "revision": "2fd8159e742a718c25e9d94601b91dce"
  },
  {
    "url": "notes/modules/-4.4 网络服务 http server.html",
    "revision": "4abc8af6ceb2c7fb1580b394f1e643a4"
  },
  {
    "url": "notes/modules/-4.5 网络服务 http client.html",
    "revision": "7361212625394265bf4f0fa1800f91b4"
  },
  {
    "url": "notes/modules/-4.6 网络服务 https.html",
    "revision": "935d367fa890aedf088d1e83dc6212e0"
  },
  {
    "url": "notes/modules/-4.7 网络TCP net.html",
    "revision": "b4f502627d0cd84ad7870709ed53cf22"
  },
  {
    "url": "notes/modules/-4.8 网络UDP dgram.html",
    "revision": "3c244803775258b030b473d4f2bb2057"
  },
  {
    "url": "notes/modules/-4.9 域名解析 dns.html",
    "revision": "a0181267ac4eb590043f763b905e7143"
  },
  {
    "url": "notes/modules/-5.0 网络地址解析 url.html",
    "revision": "670d5a391a4ab147955bf6fbb6c0b055"
  },
  {
    "url": "notes/modules/-5.1 URL查询字符串 querystring.html",
    "revision": "f8a03b25757f0c33579dfe0d858a4893"
  },
  {
    "url": "notes/modules/-6.1 流操作 stream.html",
    "revision": "49521f80e50be298f4e8695b2616fa4b"
  },
  {
    "url": "notes/modules/-6.2 逐行读取 readline.html",
    "revision": "40a8f2f50ca8dbf7d054b369b5bde835"
  },
  {
    "url": "notes/modules/-7.1 进程相关 process.html",
    "revision": "a5d671e0746c9bf6877be359f3ebb0d4"
  },
  {
    "url": "notes/modules/-7.2 子进程 child.html",
    "revision": "4afa22c4ad2631a5d47f64425bf07b74"
  },
  {
    "url": "notes/modules/-8.1 二进制数据 buffer.html",
    "revision": "1343cea4459a49ceead10566c504b68a"
  },
  {
    "url": "notes/modules/-8.2 二进制解码 string_decoder.html",
    "revision": "98490026211b87d9a86572a16b58539e"
  },
  {
    "url": "notes/modules/-9.1 事件机制 events.html",
    "revision": "5f184bdb22b884bcca6f751d95a018e6"
  },
  {
    "url": "notes/modules/-9.2 实用工具模块 util.html",
    "revision": "215e6e8f8803948d8cb7dc670504d3bb"
  },
  {
    "url": "notes/modules/-9.3 数据加密 crypto.html",
    "revision": "2ac0454ec006f3adab82698e28f77c30"
  },
  {
    "url": "notes/modules/-9.4 MD5入门介绍及crypto模块的应用.html",
    "revision": "a299902d755acdf4d1521252eac988ec"
  },
  {
    "url": "notes/modules/-9.4 资源压缩 zlib.html",
    "revision": "fd0df5bf90698272523753d86ae94387"
  },
  {
    "url": "notes/modules/-9.5 集群 cluster.html",
    "revision": "f777ddfde4cb69f5f5f42cfeff2fb66a"
  },
  {
    "url": "notes/modules/-9.6 v8.html",
    "revision": "48ce8d84fe9bf17ec14da779ae9e48b0"
  },
  {
    "url": "notes/other/01-操作数据库.html",
    "revision": "8aa42adab51ad3509d09d02301bdc4dd"
  },
  {
    "url": "notes/other/02-Session 与 Token.html",
    "revision": "23c1dfb28d6f272c14ee4a5e7e674162"
  },
  {
    "url": "notes/other/03-Cookie、Session、Token、JWT.html",
    "revision": "e38eb6599a8fd57dc831e42b7e3fae7c"
  },
  {
    "url": "notes/other/04-Socket.html",
    "revision": "4acc2c92f528a2cd2a3962ea9096abae"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
