(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=a(n);fetch(n.href,o)}})();const m=[{id:"google",answer:"Google",aliases:["google search","google.com"],asset:"clues/google.jpg",crops:["780 238 190 89","300 220 600 282","0 0 1200 720"],category:"Search",source:"https://www.google.com/",fact:"The familiar search field has stayed visually quiet even as the page around it evolved."},{id:"youtube",answer:"YouTube",aliases:["youtube.com","yt"],asset:"clues/youtube.jpg",crops:["820 0 220 103","250 0 720 338","0 0 1200 720"],category:"Video",source:"https://www.youtube.com/",fact:"A red playhead and a dense recommendation rail make this interface recognizable without its logo."},{id:"wikipedia",answer:"Wikipedia",aliases:["wikipedia.org","wiki"],asset:"clues/wikipedia.jpg",crops:["620 300 330 155","230 90 760 356","0 0 1200 720"],category:"Reference",source:"https://en.wikipedia.org/wiki/World_Wide_Web",fact:"The article-and-infobox rhythm is one of the web’s most durable page structures."},{id:"github",answer:"GitHub",aliases:["github.com","git hub"],asset:"clues/github.jpg",crops:["520 205 350 164","20 80 900 422","0 0 1200 720"],category:"Developer",source:"https://github.com/openai/openai-python",fact:"Repository tabs and the file table carry most of GitHub’s visual identity."},{id:"stackoverflow",answer:"Stack Overflow",aliases:["stackoverflow.com","stack overflow"],asset:"clues/stackoverflow.jpg",crops:["480 170 250 117","390 100 420 197","0 0 1200 720"],category:"Developer community",source:"https://stackoverflow.com/users/login",fact:"The orange rule, compact form, and trio of social sign-in buttons are classic Stack Overflow cues."},{id:"spotify",answer:"Spotify",aliases:["spotify.com"],asset:"clues/spotify.jpg",crops:["500 20 240 113","0 0 840 394","0 0 1200 720"],category:"Music",source:"https://open.spotify.com/",fact:"The persistent player and dark library layout make the product legible at a glance."},{id:"airbnb",answer:"Airbnb",aliases:["air bnb","airbnb.com"],asset:"clues/airbnb.jpg",crops:["400 170 310 145","250 90 650 305","0 0 1200 720"],category:"Travel",source:"https://www.airbnb.com/login",fact:"The segmented destination search became as recognizable as many brand marks."},{id:"amazon",answer:"Amazon",aliases:["amazon.com"],asset:"clues/amazon.jpg",crops:["750 0 270 127","0 0 850 399","0 0 1200 720"],category:"Commerce",source:"https://www.amazon.com/",fact:"Yellow purchase controls and information density are the strongest cues here."},{id:"canva",answer:"Canva",aliases:["canva.com"],asset:"clues/canva.jpg",crops:["470 180 260 122","310 80 600 282","0 0 1200 720"],category:"Design",source:"https://www.canva.com/login/",fact:"The white sign-in sheet over a wall of colorful templates makes Canva recognizable before its wordmark appears."},{id:"slack",answer:"Slack",aliases:["slack.com"],asset:"clues/slack.jpg",crops:["480 250 250 117","360 160 480 225","0 0 1200 720"],category:"Work chat",source:"https://slack.com/signin#/signin",fact:"The channel rail and message timeline have become a familiar workplace silhouette."}];function h(e){return e.toLowerCase().trim().replace(/^https?:\/\//,"").replace(/^www\./,"").replace(/\.(com|org|net|io|co)(\/.*)?$/,"").replace(/[^a-z0-9]/g,"")}function S(e,s){const a=Array.from({length:e.length+1},(r,n)=>[n]);for(let r=0;r<=s.length;r+=1)a[0][r]=r;for(let r=1;r<=e.length;r+=1)for(let n=1;n<=s.length;n+=1){const o=e[r-1]===s[n-1]?0:1;a[r][n]=Math.min(a[r-1][n]+1,a[r][n-1]+1,a[r-1][n-1]+o)}return a[e.length][s.length]}function $(e,s){const a=h(e);return a?[s.answer,...s.aliases].some(r=>{const n=h(r),o=n.length>=8?2:n.length>=5?1:0;return a===n||S(a,n)<=o}):!1}function x({revealIndex:e,wrongGuesses:s,elapsedSeconds:a,solved:r}){return r?Math.max(100,1e3-e*225-s*75-Math.min(a*3,240)):0}function T(e){let s=2166136261;for(let a=0;a<e.length;a+=1)s^=e.charCodeAt(a),s=Math.imul(s,16777619);return s>>>0}function b(e,s){const a=[...e];let r=s||1;const n=()=>(r=Math.imul(r,1664525)+1013904223>>>0,r/4294967296);for(let o=a.length-1;o>0;o-=1){const i=Math.floor(n()*(o+1));[a[o],a[i]]=[a[i],a[o]]}return a}function I(e,s=new Date){const a=s.toISOString().slice(0,10);return b(e,T(a)).slice(0,5)}function L(e,s,a){const r=e.map(o=>o.solved?["🟩","🟨","🟧"][Math.min(o.revealIndex,2)]:"⬛").join("");return`Site Unseen ${e.filter(o=>o.solved).length}/${e.length} · ${s.toLocaleString()} pts
${r}
${a}`}const l=document.querySelector("#app"),t={screen:"home",mode:"daily",rounds:[],roundIndex:0,revealIndex:0,wrongGuesses:0,startedAt:0,results:[],feedback:"",feedbackTone:"neutral",inputState:"default"};function g(e){return`./${e}`}function u(){return t.rounds[t.roundIndex]}function M(){const e=Number(localStorage.getItem("site-unseen-best")||0);return`
    ${d(!1)}
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
            <image href="${g("clues/google.jpg")}" width="1200" height="720" />
          </svg>
          <figcaption>Real public capture. Three reveals.</figcaption>
        </figure>
      </section>

      <section class="best-line" aria-label="Local best score">
        <span>Your best on this device</span>
        <strong>${e?e.toLocaleString():"—"}</strong>
      </section>
    </main>
    ${v()}
    ${p()}
  `}function d(e){return`
    <nav class="nav-min" aria-label="Primary navigation">
      <button class="wordmark" data-action="home" aria-label="Site Unseen home">
        <span class="wordmark__dot" aria-hidden="true"></span>Site Unseen
      </button>
      <div class="nav-min__links">
        <button class="nav-link" data-action="open-rules">How to play</button>
        ${e?'<button class="nav-link" data-action="restart">New game</button>':'<a class="nav-link" href="https://github.com/FGButterLettuce/site-unseen" rel="noreferrer">Source</a>'}
      </div>
    </nav>
  `}function C(){const e=u(),s=e.crops[t.revealIndex],a=t.roundIndex/t.rounds.length*100,r=t.revealIndex<e.crops.length-1;return`
    ${d(!0)}
    <main id="main" class="game-shell">
      <section class="game-meta" aria-label="Game progress">
        <p>Round ${t.roundIndex+1} of ${t.rounds.length}</p>
        <p>${t.mode==="daily"?"Daily five":"Shuffled five"}</p>
        <p>${t.results.reduce((n,o)=>n+o.score,0).toLocaleString()} pts</p>
        <div class="progress" aria-hidden="true"><span style="transform: scaleX(${a/100})"></span></div>
      </section>

      <section class="clue-workbench" aria-labelledby="clue-heading">
        <div class="clue-heading">
          <div>
            <p class="mono-label">${e.category}</p>
            <h1 id="clue-heading">Name this website.</h1>
          </div>
          <p class="reveal-count">Reveal ${t.revealIndex+1} of ${e.crops.length}</p>
        </div>

        <figure class="clue-frame" data-reveal="${t.revealIndex}">
          <div class="clue-canvas">
            <span class="capture-stamp" aria-hidden="true">PUBLIC WEB · REAL CAPTURE</span>
            <svg id="clue-viewer" viewBox="${s}" role="img" aria-label="Cropped real website screenshot, reveal ${t.revealIndex+1} of ${e.crops.length}">
              <image href="${g(e.asset)}" width="1200" height="720" />
            </svg>
          </div>
          <figcaption>The crop expands after a miss. Captured in a clean, logged-out browser.</figcaption>
        </figure>

        <form class="guess-form" data-action="guess" novalidate>
          <label for="guess">Website name</label>
          <div class="guess-form__row">
            <input id="guess" name="guess" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="e.g. Wikipedia" aria-describedby="guess-feedback" aria-invalid="${t.inputState==="error"}" />
            <button class="btn btn--primary" type="submit">Guess</button>
          </div>
          <div class="form-meta">
            <p id="guess-feedback" class="feedback feedback--${t.feedbackTone}" aria-live="polite">${t.feedback||"Type the site or domain. Small typos are fine."}</p>
            ${r?'<button class="text-action" type="button" data-action="reveal">Reveal more · −225</button>':'<button class="text-action" type="button" data-action="skip">Skip this one</button>'}
          </div>
        </form>
      </section>
    </main>
    ${p()}
  `}function _(e){const s=e.clue;return`
    ${d(!0)}
    <main id="main" class="answer-shell">
      <section class="answer-card answer-card--${e.solved?"solved":"skipped"}">
        <p class="mono-label">${e.solved?`+${e.score.toLocaleString()} points`:"Round skipped"}</p>
        <h1>${e.solved?"That’s it.":`It was ${s.answer}.`}</h1>
        <div class="answer-card__layout">
          <figure class="answer-image">
            <img src="${g(s.asset)}" width="1200" height="720" alt="Full public-page screenshot of ${s.answer}" />
          </figure>
          <div class="answer-copy">
            ${e.solved?`<p class="answer-name">${s.answer}</p>`:""}
            <p>${s.fact}</p>
            <a class="text-action" href="${s.source}" target="_blank" rel="noreferrer">View captured page <span aria-hidden="true">↗</span></a>
            <button class="btn btn--primary" data-action="next-round">${t.roundIndex===t.rounds.length-1?"See results":"Next clue"} <span aria-hidden="true">→</span></button>
          </div>
        </div>
      </section>
    </main>
    ${p()}
  `}function R(){const e=t.results.reduce((n,o)=>n+o.score,0),s=t.results.filter(n=>n.solved).length,a=Number(localStorage.getItem("site-unseen-best")||0),r=e>a;return r&&localStorage.setItem("site-unseen-best",String(e)),`
    ${d(!1)}
    <main id="main" class="results-shell">
      <section class="results-card">
        <div class="result-character" aria-hidden="true"><span></span><span></span></div>
        <p class="mono-label">${r?"New local best":t.mode==="daily"?"Today’s result":"Shuffled result"}</p>
        <h1>${s} out of ${t.results.length}</h1>
        <p class="result-score"><span data-count="${e}">${e.toLocaleString()}</span> points</p>
        <ol class="round-summary" aria-label="Round results">
          ${t.results.map(n=>`<li><span>${n.solved?["●","◐","○"][Math.min(n.revealIndex,2)]:"×"}</span><span>Round ${n.index+1}</span><strong>${n.score.toLocaleString()}</strong></li>`).join("")}
        </ol>
        <div class="result-actions">
          <button class="btn btn--primary" data-action="share">Share result</button>
          <button class="btn btn--soft" data-action="start-free">Play another five</button>
        </div>
        <p class="share-status" aria-live="polite"></p>
      </section>
    </main>
    ${v()}
    ${p()}
  `}function v(){const e="SITE UNSEEN · TINY CLUES · FAMILIAR PIXELS · ";return`
    <footer class="foot-marquee" aria-label="Site footer">
      <div class="foot-marquee__track" aria-hidden="true"><span>${e.repeat(3)}</span><span>${e.repeat(3)}</span></div>
      <p class="visually-hidden">Site Unseen. Real public-page clues. No affiliation with the websites shown.</p>
    </footer>
  `}function p(){return`
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
  `}function c(){t.screen==="home"&&(l.innerHTML=M()),t.screen==="game"&&(l.innerHTML=C()),t.screen==="answer"&&(l.innerHTML=_(t.results.at(-1))),t.screen==="results"&&(l.innerHTML=R()),t.screen==="game"&&queueMicrotask(()=>document.querySelector("#guess")?.focus()),t.screen==="results"&&queueMicrotask(A)}function A(){const e=document.querySelector("[data-count]");if(!e||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const s=Number(e.dataset.count),a=performance.now(),r=900,n=o=>{const i=Math.min(1,(o-a)/r),k=1-Math.pow(1-i,4);e.textContent=Math.round(s*k).toLocaleString(),i<1&&requestAnimationFrame(n)};e.textContent="0",requestAnimationFrame(n)}function f(e){t.mode=e,t.rounds=e==="daily"?I(m):b(m,Date.now()>>>0).slice(0,5),t.roundIndex=0,t.revealIndex=0,t.wrongGuesses=0,t.startedAt=Date.now(),t.results=[],t.feedback="",t.feedbackTone="neutral",t.inputState="default",t.screen="game",c()}function w(e="manual"){const s=u();t.revealIndex<s.crops.length-1&&(t.revealIndex+=1),t.feedback=e==="miss"?"Not that one. Here’s a little more context.":"The crop expanded. Your next guess is worth fewer points.",t.feedbackTone=e==="miss"?"error":"neutral",t.inputState=e==="miss"?"error":"default",c()}function y(e){const s=Math.round((Date.now()-t.startedAt)/1e3),a={index:t.roundIndex,clue:u(),solved:e,revealIndex:t.revealIndex,wrongGuesses:t.wrongGuesses,score:x({revealIndex:t.revealIndex,wrongGuesses:t.wrongGuesses,elapsedSeconds:s,solved:e})};t.results.push(a),t.screen="answer",c()}function G(e){const s=new FormData(e).get("guess")?.toString()||"";if(!s.trim()){t.feedback="No guess yet. Type a website name first.",t.feedbackTone="error",t.inputState="error",c();return}if($(s,u())){y(!0);return}t.wrongGuesses+=1,w("miss")}function N(){t.roundIndex>=t.rounds.length-1?t.screen="results":(t.roundIndex+=1,t.revealIndex=0,t.wrongGuesses=0,t.startedAt=Date.now(),t.feedback="",t.feedbackTone="neutral",t.inputState="default",t.screen="game"),c()}async function E(e){const s=t.results.reduce((r,n)=>r+n.score,0),a=L(t.results,s,window.location.href);e.dataset.state="loading",e.textContent="Copying…";try{navigator.share?await navigator.share({title:"Site Unseen",text:a}):await navigator.clipboard.writeText(a),e.dataset.state="success",e.textContent=navigator.share?"Shared ✓":"Copied ✓",document.querySelector(".share-status").textContent=navigator.share?"Share sheet opened.":"Result copied to your clipboard."}catch(r){if(r.name==="AbortError"){e.dataset.state="default",e.textContent="Share result";return}e.dataset.state="error",e.textContent="Try copying again",document.querySelector(".share-status").textContent="The result wasn’t copied. Try again."}}l.addEventListener("submit",e=>{e.target.matches('[data-action="guess"]')&&(e.preventDefault(),G(e.target))});l.addEventListener("click",e=>{const s=e.target.closest("[data-action]");if(!s)return;const a=s.dataset.action;a==="start-daily"&&f("daily"),a==="start-free"&&f("free"),a==="reveal"&&w(),a==="skip"&&y(!1),a==="next-round"&&N(),a==="share"&&E(s),a==="home"&&(t.screen="home",c()),a==="restart"&&f(t.mode),a==="open-rules"&&document.querySelector("#rules-dialog")?.showModal(),a==="close-rules"&&document.querySelector("#rules-dialog")?.close()});l.addEventListener("click",e=>{e.target?.id==="rules-dialog"&&e.target.close()});c();
