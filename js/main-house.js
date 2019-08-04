//document.getElementById("house-data").innerHTML = JSON.stringify(data,null,2);

var url = "https://api.propublica.org/congress/v1/113/house/members.json";
var members;

fetch(url, {
        headers: {
            "X-API-Key": "tH850Ky32mw7UoLX1KEIOAxUiqg7I96vunBVr71R"
        }
    })
    .then(function (data) {
        return data.json();
    })
    .then(function (myData) {
        console.log(myData);
        members = myData.results[0].members;

        createTable();
        showMember(members);
        showMemberDropDown();
    })

document.getElementById("dem").addEventListener("click", createTable);
document.getElementById("rep").addEventListener("click", createTable);
document.getElementById("dropDownStates").addEventListener("change", createTable);

document.getElementById("dem").addEventListener("click", createTable);
document.getElementById("rep").addEventListener("click", createTable);
document.getElementById("dropDownStates").addEventListener("change", createTable);

//var members = data.results[0].members;

//showMemberDropDown();
//createTable();


function createTable() {
    //    var tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    for (var i = 0; i < members.length; i++) {
        //for each member create tr

        var tableRow = document.createElement("tr");

        //        tableRow.insertCell().append(members[i].first_name)
        //        tableRow.insertCell().append(members[i].party)
        //        tableRow.insertCell().append(members[i].first_name)
        //        tableRow.insertCell().append(members[i].first_name)
        //        tableRow.insertCell().append(members[i].first_name)

        //        //for each row create 5 cells(full name, party, state, seniority, percentage of votes)
        var firstName = members[i].first_name;
        var middleName = members[i].middle_name;
        if (middleName == null) {
            middleName = "";
        }
        var lastName = members[i].last_name;
        var completeName = firstName + " " + middleName + " " + lastName;

        var link = document.createElement("a");
        link.setAttribute("href", members[i].url);
        link.setAttribute("target", "_blank");
        link.innerHTML = completeName;

        var party = members[i].party;
        var state = members[i].state;
        var seniority = members[i].seniority;
        var votesParty = members[i].votes_with_party_pct + "%";
        var cells = [link, party, state, seniority, votesParty];

        for (var j = 0; j < cells.length; j++) {
            var tableCell = document.createElement("td");
            tableCell.append(cells[j]);
            tableRow.append(tableCell);
        }

        if (showMember(members[i])) {
            document.getElementById("tableBody").append(tableRow);
        }
    }
}

function showMember(receivedMember) {
    var dem = document.getElementById("dem");
    var rep = document.getElementById("rep");
    var dropDownSelect = document.getElementById("dropDownStates");
    var arrayHouse = [];

    var partyFilter;
    var stateFilter;


    if (dem.checked) {
        arrayHouse.push("D");
    }

    if (rep.checked) {
        arrayHouse.push("R");
    }

    if (arrayHouse.includes(receivedMember.party) || arrayHouse.length == 0) {
        partyFilter = true;
    }

    if (dropDownSelect.value == receivedMember.state || dropDownSelect.value == "All") {
        stateFilter = true;
    }

    return partyFilter && stateFilter;

    console.log(arrayHouse);
}

function showMemberDropDown() {
    var dropDownArray = [];
    for (i = 0; i < members.length; i++) {
        if (!dropDownArray.includes(members[i].state)) {
            dropDownArray.push(members[i].state);
        }
    }
    dropDownArray.sort();
    console.log(dropDownArray);

    //  Next is the creation of each item as an option in the drop-down.    
    for (j = 0; j < dropDownArray.length; j++) {
        var dropDownItem = document.createElement("option");
        dropDownItem.append(dropDownArray[j]);
        dropDownItem.setAttribute("value", dropDownArray[j]);
        var dropDownSelect = document.getElementById("dropDownStates");
        dropDownSelect.append(dropDownItem);

    }

}
