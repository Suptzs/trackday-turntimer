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

    var e = document.getElementById("rider-list");
    var child = e.lastElementChild;
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }

    var riders = JSON.parse(localStorage.riders);
    for (const name in riders) {
        const group = riders[name];
        var li = createRiderListItem(name, group);
        document.getElementById("rider-list").appendChild(li);
    }
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

    var riders = {};
    var riderList = document.getElementById("rider-list");
    for (var i = 0; i < riderList.children.length; i++) {
        var rider = riderList.children[i];
        var name = rider.getElementsByClassName("rider-name")[0].innerText;
        var group = rider.getElementsByClassName("rider-group")[0].selectedIndex + 1;
        riders[name] = group;
    }
    localStorage.riders = JSON.stringify(riders);
}

function groupsChanged() {
    var dropdowns = document.getElementsByClassName("rider-group");

    for (var i = 0; i < dropdowns.length; i++) {
        while (dropdowns[i].options.length) {
            dropdowns[i].remove(0);
        }
        addGroupOptionsTo(dropdowns[i]);
    }
}

var groupOptions = {};
groupOptions[2] = [1, 2];
groupOptions[3] = [1, 2, 3];
groupOptions[4] = [1, 2, 3, 4];
groupOptions[5] = [1, 2, 3, 4, 5];

function addGroupOptionsTo(dropdown) {
    const groups = document.getElementById("groups").value;
    var options = groupOptions[groups];
    if (options) {
        for (var j = 0; j < options.length; j++) {
            var option = new Option(options[j], j);
            dropdown.options.add(option);
        }
    }
}

// Create a new list item when clicking on the "Add" button
function newRider() {
    var inputValue = document.getElementById("new-rider").value;
    if (inputValue === '') {
        alert("You must write something!");
        return;
    }
    var li = createRiderListItem(inputValue);
    document.getElementById("rider-list").appendChild(li);
    document.getElementById("new-rider").value = "";
}

function createRiderListItem(name, group = 1) {
    var li = document.createElement("li");

    var theName = document.createElement("span");
    theName.className = "rider-name";
    theName.innerText = name;

    li.appendChild(theName);
    li.appendChild(document.createTextNode(" is in group "));

    var dropdown = document.createElement("select");
    dropdown.className = "rider-group";
    addGroupOptionsTo(dropdown);
    dropdown.selectedIndex = group - 1;
    li.appendChild(dropdown);

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    span.onclick = function () {
        var div = this.parentElement;
        div.remove();
    }

    li.appendChild(span);

    return li;
}