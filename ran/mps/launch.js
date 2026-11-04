/* Copyright (c) 2026 mansoor0x | 1_X @ZeroMan. */
/* Modified: AppCache wait removed. Debug mode: shows each step in the page. */
(function () {
    var out = document.getElementById("out");
    function dbg(msg) {
        try {
            var p = document.createElement("p");
            p.style.cssText = "margin:4px 0;color:#00a;font-size:12px";
            p.textContent = msg;
            if (out) out.appendChild(p);
        } catch(e) {}
    }

    dbg("[1] launch.js запущен");

    var ssOk = false;
    try {
        sessionStorage.setItem("mps_from_landing", "1");
        ssOk = sessionStorage.getItem("mps_from_landing") === "1";
    } catch(e) {
        dbg("[!] sessionStorage недоступен: " + e);
    }
    dbg("[2] sessionStorage флаг: " + (ssOk ? "OK" : "FAIL"));

    var target = "exploit.html?log=1&afterglow=run&mode=goldhen";
    dbg("[3] переходим на: " + target);

    setTimeout(function() {
        location.replace(target);
    }, 800);
})();
