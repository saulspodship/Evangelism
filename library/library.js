/* Field Library — shared behaviour for the guide and tool pages.
   Mirrors the home page's navigation and install handling so the
   library feels like the same site, without pulling in app.js. */
(() => {
  const toast = document.getElementById("app-toast");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = window.siteTranslate ? window.siteTranslate(message) : message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 4200);
  }

  // Mobile navigation
  const menuToggle = document.getElementById("menu-toggle");
  const primaryNav = document.getElementById("primary-navigation");

  function setMenuOpen(open) {
    if (!menuToggle || !primaryNav) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    primaryNav.classList.toggle("is-open", open);
  }

  menuToggle?.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  primaryNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });

  // Year stamp
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  // Clipboard helper shared with the tools
  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const temporary = document.createElement("textarea");
    temporary.value = text;
    temporary.setAttribute("readonly", "");
    temporary.style.position = "fixed";
    temporary.style.opacity = "0";
    document.body.appendChild(temporary);
    temporary.select();
    const copied = document.execCommand("copy");
    temporary.remove();
    if (!copied) throw new Error("Clipboard access was unavailable.");
  }

  // Download helper so tools can export what the person has written.
  function downloadFile(filename, contents, type = "text/plain") {
    const blob = new Blob([contents], { type: `${type};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  // Storage helper: degrade quietly when localStorage is unavailable.
  function readStore(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  }

  function writeStore(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  function relativeTime(iso) {
    const then = new Date(iso).getTime();
    if (Number.isNaN(then)) return "";
    const diff = Date.now() - then;
    const minutes = Math.round(diff / 60000);
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;
    const days = Math.round(hours / 24);
    if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
    return new Date(then).toLocaleDateString();
  }

  // PWA install prompt, matching the home page wording.
  const installButton = document.getElementById("install-app");
  let installEvent = null;
  let installed = window.matchMedia?.("(display-mode: standalone)").matches || window.navigator.standalone === true;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installEvent = event;
    installButton?.classList.add("is-ready");
  });

  installButton?.addEventListener("click", async () => {
    if (installed) {
      showToast("You’re already using the Evangelism field guide as an app.");
      return;
    }
    if (installEvent) {
      installEvent.prompt();
      const choice = await installEvent.userChoice;
      if (choice?.outcome === "accepted") showToast("Evangelism is being added to your device.");
      else showToast("No problem—you can install it any time from your browser menu.");
      installEvent = null;
      installButton.classList.remove("is-ready");
      return;
    }
    const isAppleMobile = /iphone|ipad|ipod/i.test(window.navigator.userAgent) && !window.navigator.standalone;
    if (isAppleMobile) {
      showToast("To install: tap Share in Safari, then choose “Add to Home Screen.”");
    } else {
      showToast("This guide is ready to install. Open your browser menu and choose “Install app” or “Add to Home Screen.”");
    }
  });

  window.addEventListener("appinstalled", () => {
    installed = true;
    installEvent = null;
    installButton?.classList.remove("is-ready");
    showToast("Evangelism has been installed. Carry the guide with you.");
  });

  window.LibUI = { showToast, copyText, downloadFile, readStore, writeStore, relativeTime };
})();
