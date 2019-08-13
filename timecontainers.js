function countdownToNextTurn() {
    const cd = document.getElementById("countdown");
    const time = new Date(cd.getAttribute("value"));
    const now = new Date();

    var duration = (time - now) / 1000 + 1;

    if(duration <= 0) {
        updateTurns();
    } else {
        updateCountdown(duration, cd);
    }
}

function updateCountdown(time, display) {
    display.textContent = fancyTimeFormat(time);
}

function fancyTimeFormat(time)
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "01:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":";
    }

    ret += "" + (mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

function updateTurns() {
    var turns = [];

    const now = new Date();

    const minutes = Number(localStorage.minutes);

    const lunchStart = new Date(new Date().toDateString() + " " + localStorage.lunchStart);
    const lunchEnd = new Date(new Date().toDateString() + " " + localStorage.lunchEnd);

    const lunch = Math.abs(lunchEnd - lunchStart) / 1000 / 60;

    if (lunchStart <= now && now < lunchEnd) {
        turns.push({ start: lunchStart, type: "lunch" });
    }

    var count = 0;
    for (let i = 0; i < localStorage.turns; i++) {
        for (let group = 1; group <= localStorage.groups; group++ , count++) {
            var start = new Date(new Date().toDateString() + " " + localStorage.starttime);
            start.setMinutes(start.getMinutes() + count * minutes);

            if (count == 0 && now < start) {
                turns.push({ type: "sleep" });
            }

            if (start >= lunchStart) {
                start.setMinutes(start.getMinutes() + lunch); // add lunch break offset
            }

            var end = new Date(start);
            end.setMinutes(start.getMinutes() + minutes);

            if (end < now) {
                continue; // turn is over
            }

            turns.push({ start: start, type: "turn", group: group });

            if (start < lunchStart && end >= lunchStart) {
                turns.push({ start: lunchStart, type: "lunch" });
            }

            if (count + 1 == localStorage.turns * localStorage.groups) {
                turns.push({ start: end, type: "finish" });
            }
        }
    }

    if (turns.length == 0) {
        turns.push({ start: end, type: "finish" });
        var tomorrow = new Date(new Date().toDateString() + " " + localStorage.starttime);
        tomorrow.setHours(tomorrow.getHours() + 24);
        turns.push({ start: tomorrow, type: "turn", group: 1 });
    }

    updateContainers(turns);
}

function updateContainers(turns) {
    var overview = document.getElementById("turn-overview");
    var child = overview.lastElementChild;
    while (child) {
        overview.removeChild(child);
        child = overview.lastElementChild;
    }

    var riders = JSON.parse(localStorage.riders);

    overview.appendChild(createCurrentTurn(turns, riders));
    overview.appendChild(createNextTurn(turns, riders));

    for (let i = 2; i < turns.length; i++) {
        overview.appendChild(createPreviewTurn(turns[i], riders));
    }
}

function createCurrentTurn(turns, riders) {
    var current = document.createElement("div");
    current.classList.add("current", "container");

    var d = document.createElement("div");
    var s = document.createElement("span");
    current.appendChild(d);
    d.appendChild(s);
    if (turns[0].type == "lunch") {
        s.innerHTML = "Lunch &#9832;";
    }
    else if (turns[0].type == "finish") {
        s.innerHTML = "Finish &#9872;";
    }
    else if (turns[0].type == "sleep") {
        s.innerText = "Get Ready";
    }
    else {
        s.innerText = "On Track";
        var r = document.createElement("div");
        r.className = "riders";
        if (Array.isArray(riders[turns[0].group]) && riders[turns[0].group].length) {
            for (let i = 0; i < riders[turns[0].group].length; i++) {
                const name = riders[turns[0].group][i];
                var n = document.createElement("p");
                n.innerText = name;
                r.appendChild(n);
            }
            current.appendChild(r);
        }
    }

    return current;
}

function createNextTurn(turns, riders) {
    var next = document.createElement("div");
    next.classList.add("next", "container");

    var t = document.createElement("div");
    t.className = "next-titel";
    next.appendChild(t);
    var s = document.createElement("span");
    s.innerText = "Next";
    t.appendChild(s);

    var r = document.createElement("div");
    r.className = "next-riders";
    next.appendChild(r);

    var countdown = document.createElement("div");
    countdown.className = "countdown";
    next.appendChild(countdown);
    var cd = document.createElement("p");
    cd.setAttribute("id", "countdown");
    cd.setAttribute("value", turns[1].start);
    countdown.appendChild(cd);

    if (turns[1].type == "lunch") {
        var p = document.createElement("p");
        p.innerHTML = "Lunch &#9832;";
        r.appendChild(p);
    }
    else if (turns[1].type == "finish") {
        var p = document.createElement("p");
        p.innerHTML = "Finish &#9872;";
        r.appendChild(p);
    }
    else {
        if (Array.isArray(riders[turns[1].group]) && riders[turns[1].group].length) {
            for (let i = 0; i < riders[turns[1].group].length; i++) {
                const name = riders[turns[1].group][i];
                var n = document.createElement("p");
                n.innerText = name;
                r.appendChild(n);
            }
        }
    }

    return next;
}

function createPreviewTurn(turn, riders) {
    var preview = document.createElement("div");
    preview.classList.add("preview", "container");

    var t = document.createElement("div");
    preview.appendChild(t);
    var s = document.createElement("span");

    var hours = turn.start.getHours();
    var minutes = turn.start.getMinutes();

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }

    s.innerText = hours + ':' + minutes;
    t.appendChild(s);

    var r = document.createElement("div");
    r.className = "riders";
    preview.appendChild(r);

    if (turn.type == "lunch") {
        var p = document.createElement("p");
        p.innerHTML = "Lunch &#9832;";
        r.appendChild(p);
    }
    else if (turn.type == "finish") {
        var p = document.createElement("p");
        p.innerHTML = "Finish &#9872;";
        r.appendChild(p);
    }
    else {
        if (Array.isArray(riders[turn.group]) && riders[turn.group].length) {
            for (let i = 0; i < riders[turn.group].length; i++) {
                const name = riders[turn.group][i];
                var n = document.createElement("p");
                n.innerText = name;
                r.appendChild(n);
            }
        }
    }

    return preview;
}