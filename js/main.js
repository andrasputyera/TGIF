//document.getElementById("senate-data").innerHTML = JSON.stringify(data,null,2);

function textCollapse() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
        dots.style.display = "block";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "block";
    };
};



var isHouse = window.location.href.includes("house-data")

var url = "https://api.propublica.org/congress/v1/113/senate/members.json";
var where = 'senate';

if (isHouse) {
    url = "https://api.propublica.org/congress/v1/113/house/members.json";
    where = 'house';
}

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
        document.getElementsByClassName("sk-cube-grid")[0].style.display = "none";
        document.getElementById(where + "-data").style.display = "table";
        createTable();
        showMember(members);
        showMemberDropDown();

    })

document.getElementById("dem").addEventListener("click", createTable);
document.getElementById("rep").addEventListener("click", createTable);

if (!isHouse) {
    document.getElementById("ind").addEventListener("click", createTable);
}

document.getElementById("dropDownStates").addEventListener("change", createTable);

//var members = data.results[0].members;
//
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


    //    var tableBody = document.getElementById("tableBody");
    if (tableBody.rows.length === 0) {
        var noMembers = document.createElement("tr");
        var noDataMessage = "There are no members with this search criteria";
        noMembers.append(noDataMessage);
        tableBody.append(noMembers);
    }
}

function showMember(receivedMember) {
    var dem = document.getElementById("dem");
    var rep = document.getElementById("rep");
    if (!isHouse) {
        var ind = document.getElementById("ind");
    }
    var dropDownSelect = document.getElementById("dropDownStates");
    var arraySenate = [];

    var partyFilter;
    var stateFilter;


    if (dem.checked) {
        arraySenate.push("D");
    }

    if (rep.checked) {
        arraySenate.push("R");
    }

    if (!isHouse) {
        if (ind.checked) {
            arraySenate.push("I");
        }
    }

    if (arraySenate.includes(receivedMember.party) || arraySenate.length == 0) {
        partyFilter = true;
    }

    if (dropDownSelect.value == receivedMember.state || dropDownSelect.value == "All") {
        stateFilter = true;
    }

    return partyFilter && stateFilter;

    console.log(arraySenate);
}

//Drop-down for the states

//Create a function for the drop-down. Inside it I want to set up the array that will hold all the unique options. Afterwards, I want to sort the array so they appear in alphabetical order. 

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
