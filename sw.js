/* KAC 교육생 플랫폼 서비스 워커
   - 설치/홈화면 추가(PWA)를 위한 최소 SW
   - 실시간 데이터(Firebase) 정확성이 중요하므로 'network-first' 전략 사용
     (네트워크 우선, 실패 시에만 캐시 폴백 → 오래된 데이터 표시 방지)
   - Firebase/gstatic 등 동적 요청은 캐시하지 않고 그대로 통과 */
const CACHE = 'kac-student-v3';
const APP_SHELL = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(APP_SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  // GET 외 요청, 또는 외부 동적 리소스(Firebase 등)는 그대로 통과 (캐시 개입 금지)
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isCacheable = url.origin === self.location.origin;
  if (!isCacheable) return; // 교차 출처(gstatic/firebase/cdn)는 네트워크 그대로

  // 동일 출처: network-first → 실패 시 캐시 폴백
  e.respondWith(
    fetch(req)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then(m => m || caches.match('./index.html')))
  );
});
