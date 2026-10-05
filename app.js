(() => {
  const toast = document.getElementById("app-toast");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 4200);
  }

  // Conversation prompts are intentionally short, open-ended, and pressure-free.
  const starters = {
    story: [
      {
        category: "YOUR STORY",
        title: "Make it personal, not a performance.",
        description: "A simple invitation makes space for honesty—yours and theirs.",
        prompt: "“Would you be open to hearing what following Jesus has meant in my life?”"
      },
      {
        category: "YOUR STORY",
        title: "Start with what matters to them.",
        description: "Let their experience shape the conversation before you share your own.",
        prompt: "“What has shaped the way you think about faith?”"
      },
      {
        category: "YOUR STORY",
        title: "Make room for both stories.",
        description: "Curiosity helps a conversation feel mutual instead of rehearsed.",
        prompt: "“Have you ever had an experience that made you wonder about God?”"
      }
    ],
    meaning: [
      {
        category: "LIFE & MEANING",
        title: "Begin with what gives life meaning.",
        description: "An ordinary question can open a deeper conversation at the right pace.",
        prompt: "“What gives you hope when life feels uncertain?”"
      },
      {
        category: "LIFE & MEANING",
        title: "Pay attention to the longings beneath the answer.",
        description: "Listen for the joys, questions, and hopes that matter most to them.",
        prompt: "“What do you wish there was more of in the world?”"
      },
      {
        category: "LIFE & MEANING",
        title: "Invite, rather than assume.",
        description: "Let the person choose how far the conversation goes.",
        prompt: "“Would faith be something you’d ever want to explore?”"
      }
    ],
    questions: [
      {
        category: "FAITH QUESTIONS",
        title: "Let their question set the direction.",
        description: "You don’t need to steer toward a prepared answer. Start with what is real for them.",
        prompt: "“Is there something about Christianity you’ve always wondered about?”"
      },
      {
        category: "FAITH QUESTIONS",
        title: "Make uncertainty safe to name.",
        description: "Honest doubt is an invitation to listen carefully, not a problem to shut down.",
        prompt: "“What feels hardest to believe about God?”"
      },
      {
        category: "FAITH QUESTIONS",
        title: "Explore together.",
        description: "It is okay not to know. You can read, ask, and learn side by side.",
        prompt: "“Would you like to look at what Jesus says about that?”"
      }
    ],
    prayer: [
      {
        category: "PRAYER & CARE",
        title: "Offer care without making assumptions.",
        description: "A kind offer leaves the other person free to say yes or no.",
        prompt: "“Is there anything you’d like me to pray about?”"
      },
      {
        category: "PRAYER & CARE",
        title: "Let compassion come before advice.",
        description: "Being present can matter more than having the right words.",
        prompt: "“Would you like me to listen, or would it help to think this through together?”"
      },
      {
        category: "PRAYER & CARE",
        title: "Keep the invitation gentle.",
        description: "If they are comfortable, prayer can be a simple way to share hope.",
        prompt: "“Would it be okay if I prayed with you now?”"
      }
    ]
  };

  const topicButtons = Array.from(document.querySelectorAll("[data-topic]"));
  const starterCategory = document.getElementById("starter-category");
  const starterTitle = document.getElementById("starter-card-title");
  const starterDescription = document.getElementById("starter-description");
  const starterPrompt = document.getElementById("starter-prompt");
  const starterCount = document.getElementById("starter-count");
  const nextStarter = document.getElementById("next-starter");
  let activeTopic = "story";
  let activeStarter = 0;

  function renderStarter() {
    const topic = starters[activeTopic];
    const item = topic[activeStarter];
    if (!item) return;
    if (starterCategory) starterCategory.textContent = item.category;
    if (starterTitle) starterTitle.textContent = item.title;
    if (starterDescription) starterDescription.textContent = item.description;
    if (starterPrompt) starterPrompt.textContent = item.prompt;
    if (starterCount) {
      starterCount.textContent = `${String(activeStarter + 1).padStart(2, "0")} / ${String(topic.length).padStart(2, "0")}`;
    }
  }

  topicButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const topic = button.dataset.topic;
      if (!starters[topic]) return;
      activeTopic = topic;
      activeStarter = 0;
      topicButtons.forEach((candidate) => {
        const selected = candidate === button;
        candidate.classList.toggle("is-active", selected);
        candidate.setAttribute("aria-pressed", String(selected));
      });
      renderStarter();
    });
  });

  nextStarter?.addEventListener("click", () => {
    const topic = starters[activeTopic];
    activeStarter = (activeStarter + 1) % topic.length;
    renderStarter();
  });

  // The testimony builder works locally in the page; it has no form endpoint or storage.
  const storyInputs = [
    document.getElementById("story-before"),
    document.getElementById("story-turning"),
    document.getElementById("story-today")
  ].filter(Boolean);
  const storyPreview = document.getElementById("story-preview-text");
  const copyButton = document.getElementById("copy-story");
  const clearButton = document.getElementById("clear-story");
  const copyStatus = document.getElementById("copy-status");

  function getStoryParts() {
    return storyInputs.map((input) => input.value.trim());
  }

  function formatStory(parts) {
    const labels = ["Before", "Turning point", "Today"];
    return parts
      .map((value, index) => value ? `${labels[index]}: ${value}` : "")
      .filter(Boolean)
      .join("\n\n");
  }

  function updateStoryPreview() {
    if (!storyPreview) return;
    const outline = formatStory(getStoryParts());
    if (outline) {
      storyPreview.textContent = outline;
      storyPreview.classList.add("has-content");
    } else {
      storyPreview.textContent = "Add a few notes above to see your outline here.";
      storyPreview.classList.remove("has-content");
    }
  }

  storyInputs.forEach((input) => input.addEventListener("input", updateStoryPreview));

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

  copyButton?.addEventListener("click", async () => {
    const outline = formatStory(getStoryParts());
    if (!outline) {
      if (copyStatus) copyStatus.textContent = "Add a note before copying.";
      window.setTimeout(() => {
        if (copyStatus) copyStatus.textContent = "";
      }, 3000);
      return;
    }
    try {
      await copyText(outline);
      if (copyStatus) copyStatus.textContent = "Copied to clipboard.";
    } catch (error) {
      if (copyStatus) copyStatus.textContent = "Copy unavailable—select the preview text instead.";
    }
    window.setTimeout(() => {
      if (copyStatus) copyStatus.textContent = "";
    }, 3800);
  });

  clearButton?.addEventListener("click", () => {
    storyInputs.forEach((input) => { input.value = ""; });
    updateStoryPreview();
    if (copyStatus) copyStatus.textContent = "Draft cleared.";
    storyInputs[0]?.focus();
    window.setTimeout(() => {
      if (copyStatus) copyStatus.textContent = "";
    }, 2500);
  });

  // Mobile navigation: keep it keyboard reachable and close after a destination is chosen.
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

  // Native PWA install prompt on supported browsers; explain the manual route elsewhere.
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

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch((error) => {
        console.warn("The offline guide could not be registered.", error);
      });
    });
  }
})();
