/* Goal Planner — an on-device planning tool shaped by Naeem Khokhar's
   "Setting and Achieving Goals for Evangelizing" seminar handout.
   Everything is written to this device only; nothing is uploaded. */
(() => {
  const STORAGE_KEY = "sauls-podship-evangelism:planner:v1";
  const { showToast, copyText, downloadFile, readStore, writeStore } = window.LibUI;

  const fields = Array.from(document.querySelectorAll("[data-field]"));
  const status = document.getElementById("planner-status");
  const meterBar = document.getElementById("planner-meter-bar");
  const statSet = document.getElementById("stat-set");
  const statDone = document.getElementById("stat-done");
  const statAreas = document.getElementById("stat-areas");
  const goalRows = Array.from(document.querySelectorAll("[data-goal-area]"));

  const AREA_LABELS = {
    ministry: "Ministry",
    family: "Family",
    finance: "Finance",
    health: "Health",
    social: "Social life",
    intellectual: "Intellectual growth",
    spiritual: "Spiritual life"
  };

  let statusTimer;

  function setStatus(message) {
    if (!status) return;
    status.textContent = message;
    window.clearTimeout(statusTimer);
    statusTimer = window.setTimeout(() => {
      if (status) status.textContent = "";
    }, 3200);
  }

  function readValue(name) {
    const field = fields.find((candidate) => candidate.dataset.field === name);
    if (!field) return "";
    return field.type === "checkbox" ? Boolean(field.checked) : field.value.trim();
  }

  function writeValue(name, value) {
    const field = fields.find((candidate) => candidate.dataset.field === name);
    if (!field) return;
    if (field.type === "checkbox") field.checked = Boolean(value);
    else field.value = typeof value === "string" ? value : "";
  }

  function collect() {
    const data = { version: 1, savedAt: new Date().toISOString(), vision: "", mission: "", goals: {}, plan: {}, milestones: "" };
    fields.forEach((field) => {
      const path = field.dataset.field.split(".");
      const value = field.type === "checkbox" ? Boolean(field.checked) : field.value.trim();
      if (path[0] === "goals" && path.length === 3) {
        data.goals[path[1]] = data.goals[path[1]] || {};
        data.goals[path[1]][path[2]] = value;
      } else if (path[0] === "plan" && path.length === 2) {
        data.plan[path[1]] = value;
      } else {
        data[path[0]] = value;
      }
    });
    return data;
  }

  function apply(data) {
    if (!data || typeof data !== "object") return;
    fields.forEach((field) => {
      const path = field.dataset.field.split(".");
      let value;
      if (path[0] === "goals" && path.length === 3) value = data.goals?.[path[1]]?.[path[2]];
      else if (path[0] === "plan" && path.length === 2) value = data.plan?.[path[1]];
      else value = data[path[0]];
      if (value === undefined || value === null) return;
      writeValue(field.dataset.field, value);
    });
  }

  function summarize() {
    const data = collect();
    const entries = Object.entries(data.goals || {});
    const set = entries.filter(([, goal]) => (goal.goal || "").length > 0);
    const done = entries.filter(([, goal]) => goal.done && (goal.goal || "").length > 0);
    return { data, entries, set, done };
  }

  function updateStats() {
    const { set, done } = summarize();
    if (statSet) statSet.textContent = String(set.length);
    if (statDone) statDone.textContent = String(done.length);
    if (statAreas) statAreas.textContent = String(set.length);
    if (meterBar) {
      const percent = set.length ? Math.round((done.length / set.length) * 100) : 0;
      meterBar.style.width = `${percent}%`;
      meterBar.parentElement?.setAttribute("aria-valuenow", String(percent));
    }
    goalRows.forEach((row) => {
      const done = row.querySelector('[data-field$=".done"]');
      row.classList.toggle("is-done", Boolean(done?.checked));
    });
  }

  let saveTimer;
  function scheduleSave() {
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => {
      const saved = writeStore(STORAGE_KEY, collect());
      setStatus(saved ? "Saved on this device." : "This browser blocked local saving.");
    }, 450);
  }

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      updateStats();
      scheduleSave();
    });
    field.addEventListener("change", () => {
      updateStats();
      scheduleSave();
    });
  });

  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY) return;
    apply(readStore(STORAGE_KEY, null));
    updateStats();
  });

  // ---------- Summary text ----------

  function formatSummaryForCopy() {
    const { data, set, done } = summarize();
    const lines = ["SETTING AND ACHIEVING GOALS FOR EVANGELIZING", "Saul's Podship — Evangelism field library", ""];
    if (data.vision) lines.push("VISION", data.vision, "");
    if (data.mission) lines.push("MISSION", data.mission, "");
    lines.push("SMART GOALS");
    Object.entries(AREA_LABELS).forEach(([key, label]) => {
      const goal = data.goals?.[key];
      if (!goal || !goal.goal) return;
      lines.push(`• ${label}${goal.done ? " [complete]" : ""}`);
      lines.push(`  Goal: ${goal.goal}`);
      if (goal.step) lines.push(`  First step: ${goal.step}`);
      if (goal.by) lines.push(`  Timeframe: ${goal.by}`);
    });
    if (!set.length) lines.push("(no goals written yet)");
    lines.push("");
    const plan = data.plan || {};
    if (Object.values(plan).some(Boolean)) {
      lines.push("ACTION PLAN");
      if (plan.goal) lines.push(`Focus goal: ${plan.goal}`);
      ["action1", "action2", "action3"].forEach((key, index) => {
        if (plan[key]) lines.push(`Action ${index + 1}: ${plan[key]}`);
      });
      if (plan.barrier) lines.push(`Potential barrier: ${plan.barrier}`);
      if (plan.solution) lines.push(`How I will overcome it: ${plan.solution}`);
      if (plan.accountability) lines.push(`Accountability: ${plan.accountability}`);
      if (plan.rhythm) lines.push(`Check-in rhythm: ${plan.rhythm}`);
      lines.push("");
    }
    if (data.milestones) lines.push("MILESTONES & CELEBRATION", data.milestones, "");
    lines.push(`Progress: ${done.length} of ${set.length} goals complete.`);
    lines.push("Saved on this device by the Evangelism field library.");
    return lines.join("\n");
  }

  document.getElementById("planner-copy")?.addEventListener("click", async () => {
    try {
      await copyText(formatSummaryForCopy());
      setStatus("Summary copied to clipboard.");
    } catch (error) {
      setStatus("Copy unavailable—select the text manually.");
    }
  });

  document.getElementById("planner-download")?.addEventListener("click", () => {
    const stamp = new Date().toISOString().slice(0, 10);
    downloadFile(`evangelism-goal-plan-${stamp}.txt`, formatSummaryForCopy());
    setStatus("Plan downloaded.");
  });

  document.getElementById("planner-print")?.addEventListener("click", () => window.print());

  document.getElementById("planner-clear")?.addEventListener("click", () => {
    if (!window.confirm("Clear every goal, vision, and action step saved on this device?")) return;
    fields.forEach((field) => {
      if (field.type === "checkbox") field.checked = false;
      else field.value = "";
    });
    writeStore(STORAGE_KEY, collect());
    updateStats();
    setStatus("Planner cleared.");
    fields[0]?.focus();
  });

  // ---------- Example prompts ----------

  document.querySelectorAll("[data-use-example]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.useExample);
      const example = button.dataset.exampleText || button.getAttribute("data-example") || "";
      if (!target) return;
      target.value = example;
      target.dispatchEvent(new Event("input", { bubbles: true }));
      target.focus();
      showToast("Example added—edit it to make it your own.");
    });
  });

  // ---------- Boot ----------

  const stored = readStore(STORAGE_KEY, null);
  if (stored) {
    apply(stored);
    const when = stored.savedAt ? new Date(stored.savedAt).toLocaleString() : "";
    if (when) {
      setStatus(`Restored your plan from ${when}.`);
    }
  }
  updateStats();
})();
