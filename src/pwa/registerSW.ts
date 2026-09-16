export function registerServiceWorker() {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      const swUrl = `${import.meta.env.BASE_URL}sw.js`;
      navigator.serviceWorker.register(swUrl).catch(err => {
        console.log('SW registration note:', err);
      });
    });
  }
}
