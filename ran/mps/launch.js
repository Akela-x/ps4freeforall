/* Copyright (c) 2026 mansoor0x | 1_X @ZeroMan. */
/* Modified: AppCache wait removed — host manages caching via its own manifest.
   sessionStorage flag set so exploit.js FROM_LANDING check passes even when
   PS4 WebKit does not propagate document.referrer across location.replace()
   inside an iframe. */
(function () {
    try { sessionStorage.setItem("mps_from_landing", "1"); } catch (e) {}
    location.replace("exploit.html?log=1&afterglow=run&mode=goldhen");
})();
