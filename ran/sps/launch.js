/* The landing page: pick a payload, then start the run.
 *
 * Leaving this page has to be a real navigation from it -- the referrer guard
 * in exploit.js arms the chain only when the run page was reached from here. */

var TARGET = {
  goldhen: "log=1&afterglow=run&mode=goldhen",
};

var AUTOSTART_SECONDS = 0;
var STORE_KEY = "afterglow.choice";

var form = document.getElementById("pick");
var autoBox = document.getElementById("auto");
var countEl = document.getElementById("count");
var cacheEl = document.getElementById("cache");
var ticker = null;
var waitingForCache = false;
var cacheTimer = null;
var gone = false;

/* How long the start may wait for the cache before it goes anyway.
 *
 * With no route the manifest check does not fail fast -- it sits on a
 * network timeout, measured at 20-30 s on a console, and the page said
 * "waiting for the cache" the whole time. Offline use is a first-class
 * case here, not an edge case: the files are already on disk, and a run
 * from them is exactly as good. So the wait is a courtesy with an upper
 * bound, never a gate. */
var CACHE_WAIT_MS = 4000;

/* The offline cache, and the one state that must not be run through.
 *
 * While the manifest is being checked or fetched, some modules are the ones
 * the page loaded with and some are not yet on disk -- starting there can mix
 * two builds. Every other state is fine to start from: IDLE is cached and
 * current, UNCACHED means no cache at all (which works as long as the server
 * answers), and a browser with no Application Cache at all -- every desktop
 * browser since Chrome 95 -- must obviously still be able to start.
 *
 * So this blocks on CHECKING and DOWNLOADING and nothing else. The inverse,
 * passing only on IDLE, leaves the button dead wherever the cache is absent.
 *
 * The idea is titotryh-ux's, from Fewi-PS4 911e08a. */
var appCache = (function () {
  try { return window.applicationCache || null; } catch (e) { return null; }
})();

function cacheBusy() {
  if (!appCache) return false;
  try {
    return appCache.status === appCache.CHECKING
        || appCache.status === appCache.DOWNLOADING;
  } catch (e) {
    return false;
  }
}

/* UPDATEREADY used to print "reopen this page" and leave it at that -- while
   the autostart clock kept running and navigated with the files the page had
   loaded with, which are the OLD ones. On a console that is not a hint anyone
   can act on: there is no keyboard here, and nobody retypes a URL with a
   controller. So swap the cache and reload, which is what reopening the page
   would have done.
   The timestamp guard, not a once-per-session flag: a second update later in
   the same session must still be picked up, and two reloads inside ten
   seconds would be a loop. */
var SWAP_KEY = "afterglow.swapped";

function swapAndReload() {
  var last = 0;
  try { last = parseInt(sessionStorage.getItem(SWAP_KEY) || "0", 10) || 0; } catch (e) {}
  if (Date.now() - last < 10000) return false;
  try { sessionStorage.setItem(SWAP_KEY, String(Date.now())); } catch (e) {}
  try { appCache.swapCache(); } catch (e) {}
  location.reload();
  return true;
}

function cacheNote() {
  if (!cacheEl) return;
  if (!appCache) { cacheEl.textContent = ""; return; }
  var text = "";
  try {
    if (appCache.status === appCache.CHECKING) text = "checking for updates";
    else if (appCache.status === appCache.DOWNLOADING) text = "loading files - hold on";
    else if (appCache.status === appCache.UPDATEREADY) text = "newer version cached - reloading";
    else if (appCache.status === appCache.OBSOLETE) text = "the cache was dropped - the server answers directly";
  } catch (e) {}
  cacheEl.textContent = text;
}

function cacheChanged() {
  cacheNote();
  /* A newer build is on disk. Take it before anything starts. */
  try {
    if (appCache && appCache.status === appCache.UPDATEREADY) {
      stopClock();
      cacheNote();
      if (swapAndReload()) return;
    }
  } catch (e) {}
  /* Someone pressed start while the files were still coming down. Go now
     that they are here, rather than making them press again. */
  if (waitingForCache && !cacheBusy()) {
    waitingForCache = false;
    start();
  }
}

if (appCache) {
  var events = ["checking", "downloading", "progress", "cached", "noupdate",
                "updateready", "error", "obsolete"];
  for (var e = 0; e < events.length; e++) {
    try { appCache.addEventListener(events[e], cacheChanged, false); } catch (err) {}
  }
}

/* The choice is remembered in localStorage, not by any HTTP cache: cache
   headers decide whether a file is fetched again, never what the page
   remembers. Both accessors are guarded, because storage can be unavailable
   or throw outright, and the page has to work either way. */
function remember() {
  try {
    localStorage.setItem(
      STORE_KEY,
      JSON.stringify({ payload: picked(), autostart: autoBox.checked }),
    );
  } catch (e) {}
}

function restore() {
  /* This build is GoldHEN-only: ignore any previous HEN selection. */
  var goldhenRadio = form.querySelector('input[name="payload"][value="goldhen"]');
  if (goldhenRadio) goldhenRadio.checked = true;
  autoBox.checked = true;
  var saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
  } catch (e) {}
  if (!saved) return;

  /* GoldHEN is the only permitted payload in this build. */
}

function picked() {
  var radio = form.querySelector('input[name="payload"]:checked');
  return radio ? radio.value : "goldhen";
}

function start() {
  stopClock();
  /* A newer build is already on disk: take it and come back as a fresh page
     load. UPDATEREADY is deliberately NOT part of cacheBusy() -- if the
     timestamp guard refuses the swap, we must go on rather than wait for an
     event that will not come again. */
  try {
    if (appCache && appCache.status === appCache.UPDATEREADY) {
      if (swapAndReload()) return;
    }
  } catch (e) {}
  /* Not a refusal -- a bounded wait, and offline none at all. */
  if (!offline() && cacheBusy()) {
    waitingForCache = true;
    countEl.textContent = "waiting for the cache";
    cacheNote();
    if (cacheTimer === null) {
      cacheTimer = setTimeout(function () {
        cacheTimer = null;
        if (!gone) { countEl.textContent = "cache did not answer - going anyway"; go(); }
      }, CACHE_WAIT_MS);
    }
    return;
  }
  go();
}

function go() {
  if (gone) return;
  gone = true;
  if (cacheTimer !== null) { clearTimeout(cacheTimer); cacheTimer = null; }
  location.href = "exploit.html?" + TARGET.goldhen;
}

function offline() {
  try { return navigator.onLine === false; } catch (e) { return false; }
}

function stopClock() {
  if (ticker !== null) {
    clearInterval(ticker);
    ticker = null;
  }
  countEl.textContent = "";
}

function startClock() {
  var left = AUTOSTART_SECONDS;
  countEl.textContent = "starting in " + left + "s";
  ticker = setInterval(function () {
    left -= 1;
    if (left <= 0) {
      start();
      return;
    }
    countEl.textContent = "starting in " + left + "s";
  }, 1000);
}

form.addEventListener("submit", function (ev) {
  ev.preventDefault();
  start();
});

form.addEventListener("change", function (ev) {
  remember();
  if (ev.target === autoBox) {
    if (autoBox.checked) startClock();
    else stopClock();
    return;
  }
  /* Switching payload while the clock runs restarts it, so what is counting
     down is always what is actually selected. */
  if (ev.target.name === "payload" && autoBox.checked) {
    stopClock();
    startClock();
  }
});

restore();
cacheNote();
/* No countdown and no user interaction: begin the GoldHEN chain immediately. */
start();
