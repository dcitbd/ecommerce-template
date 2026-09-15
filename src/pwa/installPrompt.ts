export function setupInstallPrompt() {
  let deferredPrompt: any = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });
  return {
    triggerInstall: () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt = null;
      }
    }
  };
}
