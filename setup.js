registerServiceWorker();
setupEvents();
initialize();

function registerServiceWorker() {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register('serviceworker.js', { scope: '/trackday-turntimer/' })
    }
}

function setupEvents() {
    // options form open and close
    document.getElementById('open-button').addEventListener('click', openOptions);
    document.getElementById('cancel-btn').addEventListener('click', closeOptions);
    document.getElementById('save-btn').addEventListener('click', () => { saveOptions(); closeOptions() });

    // options
    document.getElementById('groups').addEventListener('change', groupsChanged);
    document.getElementById('addBtn').addEventListener('click', newRider);

    // clock face
    window.addEventListener('resize', resizeClockFace);
}

function initialize() {
    // option default values
    if (!localStorage.minutes) {
        localStorage.minutes = 20;
    }
    if (!localStorage.groups) {
        localStorage.groups = 3;
    }
    if (!localStorage.turns) {
        localStorage.turns = 7;
    }
    if (!localStorage.starttime) {
        localStorage.starttime = "08:20";
    }
    if (!localStorage.lunchStart) {
        localStorage.lunchStart = "11:40";
    }
    if (!localStorage.lunchEnd) {
        localStorage.lunchEnd = "13:20";
    }
    if (!localStorage.riders) {
        var riders = { "Marc Marquez": 1, "Valentino Rossi": 2 };
        localStorage.riders = JSON.stringify(riders);
    }

    // clock
    resizeClockFace();
    setInterval(drawClock, 100);

    // turn containers
    updateTurns();
}