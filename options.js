function openOptions() {
    document.getElementById("options").style.display = "block";
    document.getElementById("grid-container").style.display = "none";
    document.getElementById("open-button").style.display = "none";

    document.getElementById("minutes").value = localStorage.minutes;
    document.getElementById("groups").value = localStorage.groups;
    document.getElementById("morning-turns").value = localStorage.morningturns;
    document.getElementById("morning-time").value = localStorage.morningtime;
    document.getElementById("afternoon-turns").value = localStorage.afternoonturns;
    document.getElementById("afternoon-time").value = localStorage.afternoontime;
}

function closeOptions() {
    document.getElementById("options").style.display = "none";
    document.getElementById("grid-container").style.display = "grid";
    document.getElementById("open-button").style.display = "inline-block";
}

function saveOptions() {
    localStorage.minutes = document.getElementById("minutes").value;
    localStorage.groups = document.getElementById("groups").value;
    localStorage.morningturns = document.getElementById("morning-turns").value;
    localStorage.morningtime = document.getElementById("morning-time").value;
    localStorage.afternoonturns = document.getElementById("afternoon-turns").value;
    localStorage.afternoontime = document.getElementById("afternoon-time").value;
}