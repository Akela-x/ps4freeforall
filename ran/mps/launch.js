/* Copyright (c) 2026 mansoor0x | 1_X @ZeroMan. */
/* Wait for the offline cache to finish before starting the exploit modules. */
(function () {
    var cache = window.applicationCache;
    var status = document.getElementById("status");
    var launched = false;

    function show(text) {
        if (status) status.textContent = text;
    }

    function start() {
        if (launched) return;
        launched = true;

        show("Offline cache saved on this PS4!");

        setTimeout(function () {
            location.replace(
                "exploit.html?log=1&afterglow=run&mode=goldhen"
            );
        }, 1000);
    }

    if (!cache) {
        show("Application Cache is not supported.");
        return;
    }

    cache.addEventListener("checking", function () {
        show("Checking cache...");
    });

    cache.addEventListener("downloading", function () {
        show("Downloading files to PS4...");
    });

    cache.addEventListener("progress", function (e) {
        show("Saving files: " + e.loaded + " / " + e.total);
    });

    cache.addEventListener("cached", start);
    cache.addEventListener("noupdate", start);

    cache.addEventListener("updateready", function () {
        try {
            cache.swapCache();
        } catch (e) {}

        start();
    });

    cache.addEventListener("error", function () {
        show("Cache error! Check files and reload.");
    });

    try {
        if (cache.status === cache.IDLE) {
            start();
        } else if (cache.status === cache.UPDATEREADY) {
            cache.swapCache();
            start();
        } else if (cache.status === cache.UNCACHED) {
            show("Starting cache download...");
            cache.update();
        } else {
            show("Waiting for cache...");
        }
    } catch (e) {
        show("Cache initialization failed.");
    }
})();
