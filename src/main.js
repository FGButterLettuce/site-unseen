import "../tokens.css";
import "./styles.css";
import { clues } from "./data/clues.js";
import { buildShareText, dailyClues, matchesAnswer, scoreRound, seededShuffle } from "./game.js";

const app = document.querySelector("#app");

const state = {
  screen: "home",
  mode: "daily",
  rounds: [],
  roundIndex: 0,
  revealIndex: 0,
  wrongGuesses: 0,
  startedAt: 0,
  results: [],
  feedback: "",
  feedbackTone: "neutral",
  inputState: "default",
};

function assetUrl(path) {
  return `${import.meta.env.BASE_URL}${path}`;
}

function currentClue() {
  return state.rounds[state.roundIndex];
}

function homeTemplate() {
  const best = Number(localStorage.getItem("site-unseen-best") || 0);
  return `
    ${navTemplate(false)}
    <main id="main" class="home-shell">
      <section class="intro reveal" style="--i: 0">
        <div class="character" aria-hidden="true"><span></span><span></span></div>
        <p class="intro__lede">Real screenshot. Tiny fragment.</p>
        <h1>How well do you know the web?</h1>
        <p class="intro__copy">Name five iconic websites from real, tightly cropped public pages. Every miss reveals a little more.</p>
        <div class="home-actions">
          <button class="btn btn--primary" data-action="start-daily">Play today’s five <span aria-hidden="true">→</span></button>
          <button class="btn btn--soft" data-action="start-free">Shuffle five</button>
        </div>
      </section>

      <section class="sample reveal" style="--i: 1" aria-labelledby="sample-title">
        <div class="sample__copy">
          <h2 id="sample-title">You’ve seen this before.</h2>
          <p>Maybe not this close. Every clue comes from a fresh, logged-out public browsing session.</p>
          <button class="text-action" data-action="open-rules">See how scoring works <span aria-hidden="true">↗</span></button>
        </div>
        <figure class="sample__fragment">
          <svg viewBox="780 238 190 89" role="img" aria-label="A tightly cropped public Google screenshot">
            <image href="${assetUrl("clues/google.jpg")}" width="1200" height="720" />
          </svg>
          <figcaption>Real public capture. Three reveals.</figcaption>
        </figure>
      </section>

      <section class="best-line" aria-label="Local best score">
        <span>Your best on this device</span>
        <strong>${best ? best.toLocaleString() : "—"}</strong>
      </section>
    </main>
    ${footerTemplate()}
    ${rulesDialogTemplate()}
  `;
}

function navTemplate(inGame) {
  return `
    <nav class="nav-min" aria-label="Primary navigation">
      <button class="wordmark" data-action="home" aria-label="Site Unseen home">
        <span class="wordmark__dot" aria-hidden="true"></span>Site Unseen
      </button>
      <div class="nav-min__links">
        <button class="nav-link" data-action="open-rules">How to play</button>
        ${inGame ? '<button class="nav-link" data-action="restart">New game</button>' : '<a class="nav-link" href="https://github.com/FGButterLettuce/site-unseen" rel="noreferrer">Source</a>'}
      </div>
    </nav>
  `;
}

function gameTemplate() {
  const clue = currentClue();
  const crop = clue.crops[state.revealIndex];
  const progress = ((state.roundIndex) / state.rounds.length) * 100;
  const canReveal = state.revealIndex < clue.crops.length - 1;
  return `
    ${navTemplate(true)}
    <main id="main" class="game-shell">
      <section class="game-meta" aria-label="Game progress">
        <p>Round ${state.roundIndex + 1} of ${state.rounds.length}</p>
        <p>${state.mode === "daily" ? "Daily five" : "Shuffled five"}</p>
        <p>${state.results.reduce((sum, result) => sum + result.score, 0).toLocaleString()} pts</p>
        <div class="progress" aria-hidden="true"><span style="transform: scaleX(${progress / 100})"></span></div>
      </section>

      <section class="clue-workbench" aria-labelledby="clue-heading">
        <div class="clue-heading">
          <div>
            <p class="mono-label">${clue.category}</p>
            <h1 id="clue-heading">Name this website.</h1>
          </div>
          <p class="reveal-count">Reveal ${state.revealIndex + 1} of ${clue.crops.length}</p>
        </div>

        <figure class="clue-frame" data-reveal="${state.revealIndex}">
          <div class="clue-canvas">
            <span class="capture-stamp" aria-hidden="true">PUBLIC WEB · REAL CAPTURE</span>
            <svg id="clue-viewer" viewBox="${crop}" role="img" aria-label="Cropped real website screenshot, reveal ${state.revealIndex + 1} of ${clue.crops.length}">
              <image href="${assetUrl(clue.asset)}" width="1200" height="720" />
            </svg>
          </div>
          <figcaption>The crop expands after a miss. Captured in a clean, logged-out browser.</figcaption>
        </figure>

        <form class="guess-form" data-action="guess" novalidate>
          <label for="guess">Website name</label>
          <div class="guess-form__row">
            <input id="guess" name="guess" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="e.g. Wikipedia" aria-describedby="guess-feedback" aria-invalid="${state.inputState === "error"}" />
            <button class="btn btn--primary" type="submit">Guess</button>
          </div>
          <div class="form-meta">
            <p id="guess-feedback" class="feedback feedback--${state.feedbackTone}" aria-live="polite">${state.feedback || "Type the site or domain. Small typos are fine."}</p>
            ${canReveal ? '<button class="text-action" type="button" data-action="reveal">Reveal more · −225</button>' : '<button class="text-action" type="button" data-action="skip">Skip this one</button>'}
          </div>
        </form>
      </section>
    </main>
    ${rulesDialogTemplate()}
  `;
}

function answerTemplate(result) {
  const clue = result.clue;
  return `
    ${navTemplate(true)}
    <main id="main" class="answer-shell">
      <section class="answer-card answer-card--${result.solved ? "solved" : "skipped"}">
        <p class="mono-label">${result.solved ? `+${result.score.toLocaleString()} points` : "Round skipped"}</p>
        <h1>${result.solved ? "That’s it." : `It was ${clue.answer}.`}</h1>
        <div class="answer-card__layout">
          <figure class="answer-image">
            <img src="${assetUrl(clue.asset)}" width="1200" height="720" alt="Full public-page screenshot of ${clue.answer}" />
          </figure>
          <div class="answer-copy">
            ${result.solved ? `<p class="answer-name">${clue.answer}</p>` : ""}
            <p>${clue.fact}</p>
            <a class="text-action" href="${clue.source}" target="_blank" rel="noreferrer">View captured page <span aria-hidden="true">↗</span></a>
            <button class="btn btn--primary" data-action="next-round">${state.roundIndex === state.rounds.length - 1 ? "See results" : "Next clue"} <span aria-hidden="true">→</span></button>
          </div>
        </div>
      </section>
    </main>
    ${rulesDialogTemplate()}
  `;
}

function resultsTemplate() {
  const total = state.results.reduce((sum, result) => sum + result.score, 0);
  const solved = state.results.filter((result) => result.solved).length;
  const previousBest = Number(localStorage.getItem("site-unseen-best") || 0);
  const isBest = total > previousBest;
  if (isBest) localStorage.setItem("site-unseen-best", String(total));
  return `
    ${navTemplate(false)}
    <main id="main" class="results-shell">
      <section class="results-card">
        <div class="result-character" aria-hidden="true"><span></span><span></span></div>
        <p class="mono-label">${isBest ? "New local best" : state.mode === "daily" ? "Today’s result" : "Shuffled result"}</p>
        <h1>${solved} out of ${state.results.length}</h1>
        <p class="result-score"><span data-count="${total}">${total.toLocaleString()}</span> points</p>
        <ol class="round-summary" aria-label="Round results">
          ${state.results.map((result) => `<li><span>${result.solved ? ["●", "◐", "○"][Math.min(result.revealIndex, 2)] : "×"}</span><span>Round ${result.index + 1}</span><strong>${result.score.toLocaleString()}</strong></li>`).join("")}
        </ol>
        <div class="result-actions">
          <button class="btn btn--primary" data-action="share">Share result</button>
          <button class="btn btn--soft" data-action="start-free">Play another five</button>
        </div>
        <p class="share-status" aria-live="polite"></p>
      </section>
    </main>
    ${footerTemplate()}
    ${rulesDialogTemplate()}
  `;
}

function footerTemplate() {
  const phrase = "SITE UNSEEN · TINY CLUES · FAMILIAR PIXELS · ";
  return `
    <footer class="foot-marquee" aria-label="Site footer">
      <div class="foot-marquee__track" aria-hidden="true"><span>${phrase.repeat(3)}</span><span>${phrase.repeat(3)}</span></div>
      <p class="visually-hidden">Site Unseen. Real public-page clues. No affiliation with the websites shown.</p>
    </footer>
  `;
}

function rulesDialogTemplate() {
  return `
    <dialog id="rules-dialog" aria-labelledby="rules-title">
      <div class="dialog-inner">
        <button class="dialog-close" data-action="close-rules" aria-label="Close rules">×</button>
        <p class="mono-label">The rules</p>
        <h2 id="rules-title">How to play</h2>
        <ol>
          <li>Study the tiny interface fragment.</li>
          <li>Type the website’s name or domain.</li>
          <li>A miss reveals more context and costs points.</li>
          <li>Solve five sites, then share your spoiler-free score.</li>
        </ol>
        <p>Every clue is captured from a public, logged-out page in a clean browser session. No private screens, accounts, or user data are used.</p>
      </div>
    </dialog>
  `;
}

function render() {
  if (state.screen === "home") app.innerHTML = homeTemplate();
  if (state.screen === "game") app.innerHTML = gameTemplate();
  if (state.screen === "answer") app.innerHTML = answerTemplate(state.results.at(-1));
  if (state.screen === "results") app.innerHTML = resultsTemplate();
  if (state.screen === "game") queueMicrotask(() => document.querySelector("#guess")?.focus());
  if (state.screen === "results") queueMicrotask(animateResultCount);
}

function animateResultCount() {
  const counter = document.querySelector("[data-count]");
  if (!counter || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const target = Number(counter.dataset.count);
  const start = performance.now();
  const duration = 900;
  const tick = (now) => {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 4);
    counter.textContent = Math.round(target * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  };
  counter.textContent = "0";
  requestAnimationFrame(tick);
}

function startGame(mode) {
  state.mode = mode;
  state.rounds = mode === "daily" ? dailyClues(clues) : seededShuffle(clues, Date.now() >>> 0).slice(0, 5);
  state.roundIndex = 0;
  state.revealIndex = 0;
  state.wrongGuesses = 0;
  state.startedAt = Date.now();
  state.results = [];
  state.feedback = "";
  state.feedbackTone = "neutral";
  state.inputState = "default";
  state.screen = "game";
  render();
}

function revealMore(reason = "manual") {
  const clue = currentClue();
  if (state.revealIndex < clue.crops.length - 1) state.revealIndex += 1;
  state.feedback = reason === "miss" ? "Not that one. Here’s a little more context." : "The crop expanded. Your next guess is worth fewer points.";
  state.feedbackTone = reason === "miss" ? "error" : "neutral";
  state.inputState = reason === "miss" ? "error" : "default";
  render();
}

function finishRound(solved) {
  const elapsedSeconds = Math.round((Date.now() - state.startedAt) / 1000);
  const result = {
    index: state.roundIndex,
    clue: currentClue(),
    solved,
    revealIndex: state.revealIndex,
    wrongGuesses: state.wrongGuesses,
    score: scoreRound({ revealIndex: state.revealIndex, wrongGuesses: state.wrongGuesses, elapsedSeconds, solved }),
  };
  state.results.push(result);
  state.screen = "answer";
  render();
}

function submitGuess(form) {
  const value = new FormData(form).get("guess")?.toString() || "";
  if (!value.trim()) {
    state.feedback = "No guess yet. Type a website name first.";
    state.feedbackTone = "error";
    state.inputState = "error";
    render();
    return;
  }
  if (matchesAnswer(value, currentClue())) {
    finishRound(true);
    return;
  }
  state.wrongGuesses += 1;
  revealMore("miss");
}

function nextRound() {
  if (state.roundIndex >= state.rounds.length - 1) {
    state.screen = "results";
  } else {
    state.roundIndex += 1;
    state.revealIndex = 0;
    state.wrongGuesses = 0;
    state.startedAt = Date.now();
    state.feedback = "";
    state.feedbackTone = "neutral";
    state.inputState = "default";
    state.screen = "game";
  }
  render();
}

async function shareResult(button) {
  const score = state.results.reduce((sum, result) => sum + result.score, 0);
  const text = buildShareText(state.results, score, window.location.href);
  button.dataset.state = "loading";
  button.textContent = "Copying…";
  try {
    if (navigator.share) await navigator.share({ title: "Site Unseen", text });
    else await navigator.clipboard.writeText(text);
    button.dataset.state = "success";
    button.textContent = navigator.share ? "Shared ✓" : "Copied ✓";
    document.querySelector(".share-status").textContent = navigator.share ? "Share sheet opened." : "Result copied to your clipboard.";
  } catch (error) {
    if (error.name === "AbortError") {
      button.dataset.state = "default";
      button.textContent = "Share result";
      return;
    }
    button.dataset.state = "error";
    button.textContent = "Try copying again";
    document.querySelector(".share-status").textContent = "The result wasn’t copied. Try again.";
  }
}

app.addEventListener("submit", (event) => {
  if (event.target.matches('[data-action="guess"]')) {
    event.preventDefault();
    submitGuess(event.target);
  }
});

app.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-action]");
  if (!trigger) return;
  const action = trigger.dataset.action;
  if (action === "start-daily") startGame("daily");
  if (action === "start-free") startGame("free");
  if (action === "reveal") revealMore();
  if (action === "skip") finishRound(false);
  if (action === "next-round") nextRound();
  if (action === "share") shareResult(trigger);
  if (action === "home") { state.screen = "home"; render(); }
  if (action === "restart") startGame(state.mode);
  if (action === "open-rules") document.querySelector("#rules-dialog")?.showModal();
  if (action === "close-rules") document.querySelector("#rules-dialog")?.close();
});

app.addEventListener("click", (event) => {
  if (event.target?.id === "rules-dialog") event.target.close();
});

render();
