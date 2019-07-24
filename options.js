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

var groupOptions = {};
groupOptions[2] = [1, 2];
groupOptions[3] = [1, 2, 3];
groupOptions[4] = [1, 2, 3, 4];
groupOptions[5] = [1, 2, 3, 4, 5];

function groupsChanged() {
    const groups = document.getElementById('groups').value;
    var dropdowns = document.getElementsByClassName('rider-group');

    for (var i = 0; i < dropdowns.length; i++) {
        while(dropdowns[i].options.length) {
            dropdowns[i].remove(0);
        }
        var options = groupOptions[groups];
        if (options) {
            for (var j = 0; j < options.length; j++) {
                var option = new Option(options[j], j);
                dropdowns[i].options.add(option);
            }
        }
    }
}