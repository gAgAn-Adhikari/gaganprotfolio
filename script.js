(() => {
  const body = document.body;
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  const themeToggle = document.querySelector(".theme-toggle");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile navigation
  menuToggle?.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav?.classList.toggle("is-open", open);
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
  }));

  // Light/dark theme, persisted locally when browser storage is available.
  const savedTheme = (() => { try { return localStorage.getItem("gagan-portfolio-theme"); } catch (_) { return null; } })();
  if (savedTheme === "dark") body.dataset.theme = "dark";
  const updateThemeButton = () => {
    const dark = body.dataset.theme === "dark";
    themeToggle?.setAttribute("aria-pressed", String(dark));
    themeToggle?.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    const icon = themeToggle?.querySelector(".theme-icon");
    if (icon) icon.textContent = dark ? "☼" : "◐";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#20231e" : "#f4f1e9");
  };
  updateThemeButton();
  themeToggle?.addEventListener("click", () => {
    body.dataset.theme = body.dataset.theme === "dark" ? "light" : "dark";
    if (body.dataset.theme === "light") delete body.dataset.theme;
    try { localStorage.setItem("gagan-portfolio-theme", body.dataset.theme || "light"); } catch (_) {}
    updateThemeButton();
  });

  // Gentle reveal animations; content remains visible if IntersectionObserver is unavailable.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12, rootMargin: "0px 0px -25px 0px" });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add("is-visible"));

  // Slowly rotate the hero descriptor.
  const rotateWord = document.querySelector("[data-rotate]");
  if (rotateWord && !reducedMotion) {
    const words = ["practice", "curiosity", "experiments", "possibility"];
    let index = 0;
    window.setInterval(() => {
      rotateWord.classList.add("word-out");
      window.setTimeout(() => {
        index = (index + 1) % words.length;
        rotateWord.textContent = words[index];
        rotateWord.classList.remove("word-out");
      }, 160);
    }, 2600);
  }

  const projectInfo = {
    "embedded": {
      eyebrow: "PROJECT NOTE / 01 · EMBEDDED",
      title: "Microcontroller lab work",
      copy: "A collection of embedded-systems lab coursework and C exercises. The repository contains lab reports and project files, including material named for PWM and system tasks. It is presented as a learning collection rather than a single finished product.",
      tags: ["C", "Microcontrollers", "PWM", "Lab reports"],
      url: "https://github.com/gAgAn-Adhikari/LABWORKS-AND-PROJECTS/tree/main/EMBEDDED_PROJECTS"
    },
    "circuits": {
      eyebrow: "PROJECT NOTE / 02 · DIGITAL CIRCUITS",
      title: "Full adder & dice roller",
      copy: "Digital-circuit coursework documented in your repository's digital-circuits section. The available report is titled around a full adder with modes and a dice roller.",
      tags: ["Digital logic", "Full adder", "Dice roller"],
      url: "https://github.com/gAgAn-Adhikari/LABWORKS-AND-PROJECTS/tree/main/DIGITAL_CIRCUITS"
    },
    "voting": {
      eyebrow: "PROJECT NOTE / 03 · C",
      title: "Voting system",
      copy: "A terminal-based voting program with separate voter and election-commission flows. Voters use voter IDs, the election-commission side is protected by a code, and the program makes results available to users.",
      tags: ["C", "Console application", "Menu logic"],
      url: "https://github.com/gAgAn-Adhikari/voting-system"
    },
    "rock-paper": {
      eyebrow: "PROJECT NOTE / 04 · PYTHON",
      title: "Rock–Paper–Scissors",
      copy: "A desktop game built with Python and Tkinter. The GUI script tracks player and computer points, displays each round's result, offers a reset button, and lets the user switch between dark and light themes.",
      tags: ["Python", "Tkinter", "Random choice", "GUI"],
      url: "https://github.com/gAgAn-Adhikari/rock_paper"
    },
    "shopping": {
      eyebrow: "PROJECT NOTE / 05 · PYTHON",
      title: "Shopping-list manager",
      copy: "A small command-line program that asks for a list title, lets the user add items, prints the current list, and outputs the completed list at the end. A simple exercise in loops, lists and input validation.",
      tags: ["Python", "Lists", "Loops", "CLI"],
      url: "https://github.com/gAgAn-Adhikari/LABWORKS-AND-PROJECTS/tree/main/FUNDAMENTAL-PROGRAMMING/PROJECT1_SHOPPING%20CART"
    },
    "test-subjects": {
      eyebrow: "PROJECT NOTE / 06 · PYTHON",
      title: "Test-subject registry",
      copy: "A menu-based record tool to register a subject number and a time in minutes, list stored records, and read data from or write data to a text file.",
      tags: ["Python", "Functions", "File I/O", "Data records"],
      url: "https://github.com/gAgAn-Adhikari/LABWORKS-AND-PROJECTS/tree/main/FUNDAMENTAL-PROGRAMMING/PROJECT2_TIME_LAP_BETWEEN_EXERCISE"
    },
    "social-graph": {
      eyebrow: "PROJECT NOTE / 07 · PYTHON",
      title: "Social graph explorer",
      copy: "A command-line graph exercise that stores connections between suspects and accomplices, finds potential indirect accomplices from known relationships, and saves or loads the graph with Python pickle.",
      tags: ["Python", "Graph relationships", "Sets", "Pickle"],
      url: "https://github.com/gAgAn-Adhikari/LABWORKS-AND-PROJECTS/tree/main/FUNDAMENTAL-PROGRAMMING/PROJECT3_SOCIAL_GRAPH"
    }
  };
  const peekInfo = {
    hardware: { title: "Hardware", copy: "The physical side of a system: electronic components, boards and the microcontrollers that run embedded code.", tags: ["Electronics", "Microcontrollers", "PCB design"] },
    software: { title: "Software", copy: "I practise programming through C and Python coursework—from command-line utilities and small games to embedded C lab work.", tags: ["C", "Python", "Problem-solving"] },
    systems: { title: "Connected systems", copy: "My degree specialises in the Internet of Things. I'm interested in how sensors, embedded devices and software can fit together as useful systems.", tags: ["IoT", "Embedded systems", "Integration"] },
    iot: { title: "Internet of Things", copy: "My BSc at Kristianstad University specialises in IoT. This portfolio highlights the related themes I am exploring: embedded systems, electronics, programming and connected technology.", tags: ["Degree specialisation", "Sensors", "Connected devices"] },
    embedded: { title: "Embedded systems", copy: "I’m exploring microcontroller programming and embedded lab exercises, with a focus on understanding how code interacts with hardware.", tags: ["C", "Microcontrollers", "PWM"] },
    electronics: { title: "Electronics & PCB design", copy: "KiCad and PCB design are among my listed technical skills. I’m also working through digital-circuit concepts such as logic gates and a full adder.", tags: ["KiCad", "PCB design", "Digital logic"] }
  };

  const dialog = document.getElementById("peek-dialog");
  const dialogTitle = document.getElementById("dialog-title");
  const dialogCopy = document.getElementById("dialog-copy");
  const dialogEyebrow = document.getElementById("dialog-eyebrow");
  const dialogTags = document.getElementById("dialog-tags");
  const dialogLink = document.getElementById("dialog-link");
  const closeButton = document.querySelector(".dialog-close");
  function openDialog(item, fallbackLabel = "FIELD NOTE / QUICK PEEK") {
    if (!dialog || !item) return;
    dialogEyebrow.textContent = item.eyebrow || fallbackLabel;
    dialogTitle.textContent = item.title || "A closer look";
    dialogCopy.textContent = item.copy || "";
    dialogTags.replaceChildren();
    (item.tags || []).forEach(tag => {
      const span = document.createElement("span");
      span.textContent = tag;
      dialogTags.appendChild(span);
    });
    if (item.url) {
      dialogLink.href = item.url;
      dialogLink.hidden = false;
    } else dialogLink.hidden = true;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }
  document.querySelectorAll("[data-open-project]").forEach(button => button.addEventListener("click", () => openDialog(projectInfo[button.dataset.openProject])));
  document.querySelectorAll("[data-peek]").forEach(button => button.addEventListener("click", () => {
    const key = button.dataset.peek;
    const item = peekInfo[key] || (projectInfo[key] ? { title: projectInfo[key].title, copy: projectInfo[key].copy, tags: projectInfo[key].tags, url: projectInfo[key].url } : null);
    openDialog(item);
  }));
  const closeDialog = () => { if (dialog?.open) dialog.close(); };
  closeButton?.addEventListener("click", closeDialog);
  dialog?.addEventListener("click", event => {
    if (event.target === dialog) closeDialog();
  });

  // Project filters.
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const projectCards = [...document.querySelectorAll(".project-card[data-category]")];
  const visibleCount = document.getElementById("visible-count");
  filterButtons.forEach(button => button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    let count = 0;
    projectCards.forEach(card => {
      const categories = (card.dataset.category || "").split(/\s+/);
      const visible = filter === "all" || categories.includes(filter);
      card.hidden = !visible;
      if (visible) count++;
    });
    if (visibleCount) visibleCount.textContent = String(count).padStart(2, "0");
  }));

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();