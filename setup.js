registerServiceWorker();
setupEvents();
initialize();

function registerServiceWorker() {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register('serviceworker.js', { scope: '/trackday-turntimer/' })
    }
}

function setupEvents() {
    // options form
    document.getElementById('open-button').addEventListener('click', openOptions);
    document.getElementById('cancel-btn').addEventListener('click', closeOptions);
    document.getElementById('save-btn').addEventListener('click', () => { saveOptions(); closeOptions() });

    // clock face
    window.addEventListener('resize', resizeClockFace);
}

function initialize() {
    // clock
    resizeClockFace();
    setInterval(drawClock, 100);

    // option default values
    if (!localStorage.minutes) {
        localStorage.minutes = 20;
    }
    if (!localStorage.groups) {
        localStorage.groups = 3;
    }
    if (!localStorage.morningturns) {
        localStorage.morningturns = 3;
    }
    if (!localStorage.morningtime) {
        localStorage.morningtime = "08:20";
    }
    if (!localStorage.afternoonturns) {
        localStorage.afternoonturns = 3;
    }
    if (!localStorage.afternoontime) {
        localStorage.afternoontime = "13:20";
    }
}