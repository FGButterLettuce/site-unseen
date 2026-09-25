(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=a(n);fetch(n.href,o)}})();const g=[{id:"google",answer:"Google",aliases:["google search","google.com"],asset:"clues/google.svg",crops:["780 320 145 80","280 286 640 178","0 0 1200 720"],category:"Search",fact:"The familiar search field has stayed visually quiet even as the page around it evolved."},{id:"youtube",answer:"YouTube",aliases:["youtube.com","yt"],asset:"clues/youtube.svg",crops:["690 545 260 100","300 330 700 290","0 0 1200 720"],category:"Video",fact:"A red playhead and a dense recommendation rail make this interface recognizable without its logo."},{id:"wikipedia",answer:"Wikipedia",aliases:["wikipedia.org","wiki"],asset:"clues/wikipedia.svg",crops:["760 236 235 150","188 146 760 390","0 0 1200 720"],category:"Reference",fact:"The article-and-infobox rhythm is one of the web’s most durable page structures."},{id:"github",answer:"GitHub",aliases:["github.com","git hub"],asset:"clues/github.svg",crops:["492 226 330 120","218 150 780 400","0 0 1200 720"],category:"Developer",fact:"Repository tabs and the file table carry most of GitHub’s visual identity."},{id:"reddit",answer:"Reddit",aliases:["reddit.com"],asset:"clues/reddit.svg",crops:["194 238 160 180","118 138 760 430","0 0 1200 720"],category:"Community",fact:"The voting rail remains a strong clue even after multiple generations of redesigns."},{id:"spotify",answer:"Spotify",aliases:["spotify.com"],asset:"clues/spotify.svg",crops:["496 588 250 94","216 238 760 380","0 0 1200 720"],category:"Music",fact:"The persistent player and dark library layout make the product legible at a glance."},{id:"airbnb",answer:"Airbnb",aliases:["air bnb","airbnb.com"],asset:"clues/airbnb.svg",crops:["456 92 290 110","160 60 880 310","0 0 1200 720"],category:"Travel",fact:"The segmented destination search became as recognizable as many brand marks."},{id:"amazon",answer:"Amazon",aliases:["amazon.com"],asset:"clues/amazon.svg",crops:["898 352 220 154","646 144 480 470","0 0 1200 720"],category:"Commerce",fact:"Yellow purchase controls and information density are the strongest cues here."},{id:"figma",answer:"Figma",aliases:["figma.com"],asset:"clues/figma.svg",crops:["988 194 160 310","730 92 430 520","0 0 1200 720"],category:"Design",fact:"Panels on both sides of a large canvas make the editor recognizable even without a file name."},{id:"slack",answer:"Slack",aliases:["slack.com"],asset:"clues/slack.svg",crops:["176 226 210 270","82 90 640 520","0 0 1200 720"],category:"Work chat",fact:"The channel rail and message timeline have become a familiar workplace silhouette."}];function h(e){return e.toLowerCase().trim().replace(/^https?:\/\//,"").replace(/^www\./,"").replace(/\.(com|org|net|io|co)(\/.*)?$/,"").replace(/[^a-z0-9]/g,"")}function S(e,s){const a=Array.from({length:e.length+1},(r,n)=>[n]);for(let r=0;r<=s.length;r+=1)a[0][r]=r;for(let r=1;r<=e.length;r+=1)for(let n=1;n<=s.length;n+=1){const o=e[r-1]===s[n-1]?0:1;a[r][n]=Math.min(a[r-1][n]+1,a[r][n-1]+1,a[r-1][n-1]+o)}return a[e.length][s.length]}function $(e,s){const a=h(e);return a?[s.answer,...s.aliases].some(r=>{const n=h(r),o=n.length>=8?2:n.length>=5?1:0;return a===n||S(a,n)<=o}):!1}function k({revealIndex:e,wrongGuesses:s,elapsedSeconds:a,solved:r}){return r?Math.max(100,1e3-e*225-s*75-Math.min(a*3,240)):0}function T(e){let s=2166136261;for(let a=0;a<e.length;a+=1)s^=e.charCodeAt(a),s=Math.imul(s,16777619);return s>>>0}function b(e,s){const a=[...e];let r=s||1;const n=()=>(r=Math.imul(r,1664525)+1013904223>>>0,r/4294967296);for(let o=a.length-1;o>0;o-=1){const i=Math.floor(n()*(o+1));[a[o],a[i]]=[a[i],a[o]]}return a}function I(e,s=new Date){const a=s.toISOString().slice(0,10);return b(e,T(a)).slice(0,5)}function L(e,s,a){const r=e.map(o=>o.solved?["🟩","🟨","🟧"][Math.min(o.revealIndex,2)]:"⬛").join("");return`Site Unseen ${e.filter(o=>o.solved).length}/${e.length} · ${s.toLocaleString()} pts
${r}
${a}`}const l=document.querySelector("#app"),t={screen:"home",mode:"daily",rounds:[],roundIndex:0,revealIndex:0,wrongGuesses:0,startedAt:0,results:[],feedback:"",feedbackTone:"neutral",inputState:"default"};function m(e){return`./${e}`}function u(){return t.rounds[t.roundIndex]}function M(){const e=Number(localStorage.getItem("site-unseen-best")||0);return`
    ${d(!1)}
    <main id="main" class="home-shell">
      <section class="intro reveal" style="--i: 0">
        <div class="character" aria-hidden="true"><span></span><span></span></div>
        <p class="intro__lede">Tiny fragment. Familiar feeling.</p>
        <h1>How well do you know the web?</h1>
        <p class="intro__copy">Name five iconic websites from tightly cropped interface clues. Every miss reveals a little more.</p>
        <div class="home-actions">
          <button class="btn btn--primary" data-action="start-daily">Play today’s five <span aria-hidden="true">→</span></button>
          <button class="btn btn--soft" data-action="start-free">Shuffle five</button>
        </div>
      </section>

      <section class="sample reveal" style="--i: 1" aria-labelledby="sample-title">
        <div class="sample__copy">
          <h2 id="sample-title">You’ve seen this before.</h2>
          <p>Maybe not this close. Clues are original interface reconstructions with no account data or private screens.</p>
          <button class="text-action" data-action="open-rules">See how scoring works <span aria-hidden="true">↗</span></button>
        </div>
        <figure class="sample__fragment">
          <svg viewBox="780 320 145 80" role="img" aria-label="A tiny cropped website interface example">
            <image href="${m("clues/google.svg")}" width="1200" height="720" />
          </svg>
          <figcaption>One fragment. Three reveals.</figcaption>
        </figure>
      </section>

      <section class="best-line" aria-label="Local best score">
        <span>Your best on this device</span>
        <strong>${e?e.toLocaleString():"—"}</strong>
      </section>
    </main>
    ${v()}
    ${f()}
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
          <svg id="clue-viewer" viewBox="${s}" role="img" aria-label="Cropped interface clue, reveal ${t.revealIndex+1} of ${e.crops.length}">
            <image href="${m(e.asset)}" width="1200" height="720" />
          </svg>
          <figcaption>The crop expands after a miss. Text may be intentionally abstracted.</figcaption>
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
    ${f()}
  `}function _(e){const s=e.clue;return`
    ${d(!0)}
    <main id="main" class="answer-shell">
      <section class="answer-card answer-card--${e.solved?"solved":"skipped"}">
        <p class="mono-label">${e.solved?`+${e.score.toLocaleString()} points`:"Round skipped"}</p>
        <h1>${e.solved?"That’s it.":`It was ${s.answer}.`}</h1>
        <div class="answer-card__layout">
          <figure class="answer-image">
            <img src="${m(s.asset)}" width="1200" height="720" alt="Full synthetic reconstruction for ${s.answer}" />
          </figure>
          <div class="answer-copy">
            ${e.solved?`<p class="answer-name">${s.answer}</p>`:""}
            <p>${s.fact}</p>
            <button class="btn btn--primary" data-action="next-round">${t.roundIndex===t.rounds.length-1?"See results":"Next clue"} <span aria-hidden="true">→</span></button>
          </div>
        </div>
      </section>
    </main>
    ${f()}
  `}function A(){const e=t.results.reduce((n,o)=>n+o.score,0),s=t.results.filter(n=>n.solved).length,a=Number(localStorage.getItem("site-unseen-best")||0),r=e>a;return r&&localStorage.setItem("site-unseen-best",String(e)),`
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
    ${f()}
  `}function v(){const e="SITE UNSEEN · TINY CLUES · FAMILIAR PIXELS · ";return`
    <footer class="foot-marquee" aria-label="Site footer">
      <div class="foot-marquee__track" aria-hidden="true"><span>${e.repeat(3)}</span><span>${e.repeat(3)}</span></div>
      <p class="visually-hidden">Site Unseen. Original synthetic clues. No affiliation with the websites shown.</p>
    </footer>
  `}function f(){return`
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
        <p>Every clue is an original SVG reconstruction made with synthetic text. No private screens, accounts, or user data are used.</p>
      </div>
    </dialog>
  `}function c(){t.screen==="home"&&(l.innerHTML=M()),t.screen==="game"&&(l.innerHTML=C()),t.screen==="answer"&&(l.innerHTML=_(t.results.at(-1))),t.screen==="results"&&(l.innerHTML=A()),t.screen==="game"&&queueMicrotask(()=>document.querySelector("#guess")?.focus()),t.screen==="results"&&queueMicrotask(G)}function G(){const e=document.querySelector("[data-count]");if(!e||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const s=Number(e.dataset.count),a=performance.now(),r=900,n=o=>{const i=Math.min(1,(o-a)/r),x=1-Math.pow(1-i,4);e.textContent=Math.round(s*x).toLocaleString(),i<1&&requestAnimationFrame(n)};e.textContent="0",requestAnimationFrame(n)}function p(e){t.mode=e,t.rounds=e==="daily"?I(g):b(g,Date.now()>>>0).slice(0,5),t.roundIndex=0,t.revealIndex=0,t.wrongGuesses=0,t.startedAt=Date.now(),t.results=[],t.feedback="",t.feedbackTone="neutral",t.inputState="default",t.screen="game",c()}function y(e="manual"){const s=u();t.revealIndex<s.crops.length-1&&(t.revealIndex+=1),t.feedback=e==="miss"?"Not that one. Here’s a little more context.":"The crop expanded. Your next guess is worth fewer points.",t.feedbackTone=e==="miss"?"error":"neutral",t.inputState=e==="miss"?"error":"default",c()}function w(e){const s=Math.round((Date.now()-t.startedAt)/1e3),a={index:t.roundIndex,clue:u(),solved:e,revealIndex:t.revealIndex,wrongGuesses:t.wrongGuesses,score:k({revealIndex:t.revealIndex,wrongGuesses:t.wrongGuesses,elapsedSeconds:s,solved:e})};t.results.push(a),t.screen="answer",c()}function N(e){const s=new FormData(e).get("guess")?.toString()||"";if(!s.trim()){t.feedback="No guess yet. Type a website name first.",t.feedbackTone="error",t.inputState="error",c();return}if($(s,u())){w(!0);return}t.wrongGuesses+=1,y("miss")}function R(){t.roundIndex>=t.rounds.length-1?t.screen="results":(t.roundIndex+=1,t.revealIndex=0,t.wrongGuesses=0,t.startedAt=Date.now(),t.feedback="",t.feedbackTone="neutral",t.inputState="default",t.screen="game"),c()}async function q(e){const s=t.results.reduce((r,n)=>r+n.score,0),a=L(t.results,s,window.location.href);e.dataset.state="loading",e.textContent="Copying…";try{navigator.share?await navigator.share({title:"Site Unseen",text:a}):await navigator.clipboard.writeText(a),e.dataset.state="success",e.textContent=navigator.share?"Shared ✓":"Copied ✓",document.querySelector(".share-status").textContent=navigator.share?"Share sheet opened.":"Result copied to your clipboard."}catch(r){if(r.name==="AbortError"){e.dataset.state="default",e.textContent="Share result";return}e.dataset.state="error",e.textContent="Try copying again",document.querySelector(".share-status").textContent="The result wasn’t copied. Try again."}}l.addEventListener("submit",e=>{e.target.matches('[data-action="guess"]')&&(e.preventDefault(),N(e.target))});l.addEventListener("click",e=>{const s=e.target.closest("[data-action]");if(!s)return;const a=s.dataset.action;a==="start-daily"&&p("daily"),a==="start-free"&&p("free"),a==="reveal"&&y(),a==="skip"&&w(!1),a==="next-round"&&R(),a==="share"&&q(s),a==="home"&&(t.screen="home",c()),a==="restart"&&p(t.mode),a==="open-rules"&&document.querySelector("#rules-dialog")?.showModal(),a==="close-rules"&&document.querySelector("#rules-dialog")?.close()});l.addEventListener("click",e=>{e.target?.id==="rules-dialog"&&e.target.close()});c();
