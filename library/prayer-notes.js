/* Prayer Notes — a private, on-device prayer wall inspired by the
   "Create a prayer wall" activity in the Key Characteristics of Gen Z handout.
   Notes live only in this browser. Nothing is uploaded or synced. */
(() => {
  const STORAGE_KEY = "sauls-podship-evangelism:prayer-notes:v1";
  const { showToast, copyText, downloadFile, readStore, writeStore, relativeTime } = window.LibUI;

  const form = document.getElementById("note-form");
  const nameInput = document.getElementById("note-name");
  const requestInput = document.getElementById("note-request");
  const tagSelect = document.getElementById("note-tag");
  const scriptureInput = document.getElementById("note-scripture");
  const submitButton = document.getElementById("note-submit");
  const cancelButton = document.getElementById("note-cancel");
  const list = document.getElementById("note-list");
  const emptyState = document.getElementById("note-empty");
  const filterRow = document.getElementById("note-filters");
  const searchInput = document.getElementById("note-search");
  const status = document.getElementById("note-status");
  const statTotal = document.getElementById("note-stat-total");
  const statPraying = document.getElementById("note-stat-praying");
  const statAnswered = document.getElementById("note-stat-answered");

  const TAG_LABELS = {
    family: "Family",
    friend: "Friend",
    neighbour: "Neighbour",
    colleague: "Colleague",
    "gen-z": "Gen Z",
    community: "Community",
    other: "Other"
  };

  let notes = readStore(STORAGE_KEY, []);
  if (!Array.isArray(notes)) notes = [];
  let filter = "all";
  let query = "";
  let editingId = null;
  let statusTimer;

  function setStatus(message) {
    if (!status) return;
    status.textContent = message;
    window.clearTimeout(statusTimer);
    statusTimer = window.setTimeout(() => {
      if (status) status.textContent = "";
    }, 3200);
  }

  function persist() {
    const saved = writeStore(STORAGE_KEY, notes);
    if (!saved) setStatus("This browser blocked local saving.");
    return saved;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function makeId() {
    return `note-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  }

  function visibleNotes() {
    const needle = query.trim().toLowerCase();
    return notes.filter((note) => {
      if (filter === "praying" && note.answered) return false;
      if (filter === "answered" && !note.answered) return false;
      if (!needle) return true;
      return [note.name, note.request, note.scripture, TAG_LABELS[note.tag] || ""]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }

  function render() {
    if (!list) return;
    const rows = visibleNotes();
    list.innerHTML = "";

    rows.forEach((note) => {
      const item = document.createElement("article");
      item.className = `lib-note${note.answered ? " is-answered" : ""}`;
      item.dataset.id = note.id;

      const tagLabel = TAG_LABELS[note.tag] || "Prayer";
      const when = note.answered && note.answeredAt
        ? `Answered ${relativeTime(note.answeredAt)}`
        : `Added ${relativeTime(note.createdAt)}`;

      item.innerHTML = `
        <div class="lib-note-top">
          <strong>${escapeHtml(note.name || "Unnamed")}</strong>
          <span class="lib-note-when">${escapeHtml(when)}</span>
        </div>
        <p>${escapeHtml(note.request || "")}</p>
        ${note.scripture ? `<p class="lib-note-scripture"><span class="micro-label">PRAYING WITH</span> ${escapeHtml(note.scripture)}</p>` : ""}
        <div class="lib-note-tags">
          <span class="lib-chip">${escapeHtml(tagLabel)}</span>
          ${note.answered ? '<span class="lib-chip is-answered">Answered</span>' : ""}
        </div>
        <div class="lib-note-actions">
          <button type="button" data-action="toggle">${note.answered ? "Reopen" : "Mark answered"}</button>
          <button type="button" data-action="edit">Edit</button>
          <button type="button" data-action="copy">Copy</button>
          <button type="button" data-action="delete">Delete</button>
        </div>
      `;

      list.appendChild(item);
    });

    if (emptyState) {
      const hasAny = notes.length > 0;
      emptyState.hidden = rows.length > 0;
      emptyState.innerHTML = hasAny
        ? "<b>No notes match this view.</b>Try another filter or clear the search."
        : "<b>Your prayer wall is empty.</b>Write one concern at a time—a name, the need, and how you will pray. Even one note is a beginning.";
    }

    if (statTotal) statTotal.textContent = String(notes.length);
    if (statPraying) statPraying.textContent = String(notes.filter((note) => !note.answered).length);
    if (statAnswered) statAnswered.textContent = String(notes.filter((note) => note.answered).length);
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput?.value.trim() || "";
    const request = requestInput?.value.trim() || "";
    if (!name && !request) {
      setStatus("Add a name or a request first.");
      nameInput?.focus();
      return;
    }

    if (editingId) {
      notes = notes.map((note) => note.id === editingId
        ? { ...note, name, request, tag: tagSelect?.value || "other", scripture: scriptureInput?.value.trim() || "", updatedAt: new Date().toISOString() }
        : note);
      setStatus("Note updated.");
    } else {
      notes = [{
        id: makeId(),
        name,
        request,
        tag: tagSelect?.value || "other",
        scripture: scriptureInput?.value.trim() || "",
        answered: false,
        createdAt: new Date().toISOString(),
        answeredAt: null
      }, ...notes];
      setStatus("Added to your prayer wall.");
    }

    persist();
    resetForm();
    render();
  });

  function resetForm() {
    editingId = null;
    form?.reset();
    if (submitButton) submitButton.textContent = "Add to prayer wall";
    cancelButton?.setAttribute("hidden", "");
    render();
  }

  cancelButton?.addEventListener("click", () => {
    resetForm();
    setStatus("Edit cancelled.");
  });

  function startEdit(note) {
    editingId = note.id;
    if (nameInput) nameInput.value = note.name || "";
    if (requestInput) requestInput.value = note.request || "";
    if (tagSelect) tagSelect.value = note.tag || "other";
    if (scriptureInput) scriptureInput.value = note.scripture || "";
    if (submitButton) submitButton.textContent = "Save changes";
    cancelButton?.removeAttribute("hidden");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
    nameInput?.focus();
  }

  list?.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const item = button.closest(".lib-note");
    const note = notes.find((candidate) => candidate.id === item?.dataset.id);
    if (!note) return;

    switch (button.dataset.action) {
      case "toggle": {
        const answered = !note.answered;
        notes = notes.map((candidate) => candidate.id === note.id
          ? { ...candidate, answered, answeredAt: answered ? new Date().toISOString() : null }
          : candidate);
        persist();
        render();
        setStatus(answered ? "Marked as answered—give thanks." : "Back on your prayer list.");
        break;
      }
      case "edit":
        startEdit(note);
        break;
      case "copy": {
        const text = `${note.name || "Prayer note"}\n${note.request || ""}${note.scripture ? `\nPraying with: ${note.scripture}` : ""}`;
        try {
          await copyText(text);
          setStatus("Note copied.");
        } catch (error) {
          setStatus("Copy unavailable.");
        }
        break;
      }
      case "delete": {
        if (!window.confirm("Delete this prayer note from this device?")) return;
        notes = notes.filter((candidate) => candidate.id !== note.id);
        persist();
        render();
        setStatus("Note deleted.");
        break;
      }
      default:
        break;
    }
  });

  filterRow?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;
    filter = button.dataset.filter;
    filterRow.querySelectorAll("button[data-filter]").forEach((candidate) => {
      const active = candidate === button;
      candidate.classList.toggle("is-active", active);
      candidate.setAttribute("aria-pressed", String(active));
    });
    render();
  });

  searchInput?.addEventListener("input", () => {
    query = searchInput.value;
    render();
  });

  function formatAll() {
    if (!notes.length) return "No prayer notes saved yet.";
    const lines = ["PRAYER NOTES", "Saul's Podship — Evangelism field library", ""];
    notes.forEach((note) => {
      lines.push(`${note.answered ? "[Answered] " : ""}${note.name || "Unnamed"} — ${TAG_LABELS[note.tag] || "Prayer"}`);
      if (note.request) lines.push(note.request);
      if (note.scripture) lines.push(`Praying with: ${note.scripture}`);
      lines.push("");
    });
    lines.push("Kept on this device only.");
    return lines.join("\n");
  }

  document.getElementById("notes-copy-all")?.addEventListener("click", async () => {
    try {
      await copyText(formatAll());
      setStatus("All notes copied.");
    } catch (error) {
      setStatus("Copy unavailable.");
    }
  });

  document.getElementById("notes-download")?.addEventListener("click", () => {
    const stamp = new Date().toISOString().slice(0, 10);
    downloadFile(`evangelism-prayer-notes-${stamp}.txt`, formatAll());
    setStatus("Notes downloaded.");
  });

  document.getElementById("notes-print")?.addEventListener("click", () => window.print());

  document.getElementById("notes-clear-all")?.addEventListener("click", () => {
    if (!notes.length) {
      setStatus("There is nothing to clear.");
      return;
    }
    if (!window.confirm("Delete every prayer note saved on this device?")) return;
    notes = [];
    persist();
    render();
    setStatus("Prayer wall cleared.");
  });

  document.querySelectorAll("[data-prayer-prompt]").forEach((button) => {
    button.addEventListener("click", () => {
      if (requestInput) {
        requestInput.value = button.dataset.prayerPrompt;
        requestInput.focus();
        requestInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });
  });

  render();
})();
