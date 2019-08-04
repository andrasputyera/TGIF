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

        getTopTableInfo();
        createTopTable();
    
        mostEngaged(sortMembersByMissedVotes(members));
        leastEngaged(sortMembersByMissedVotes(members));
        createLeastEngagedTable();
        createMostEngagedTable();
    

    })

//var members = data.results[0].members;

var statistics = {
    "parties": [
        {
            "party": "Democrats",
            "number_of_members": 0,
            "votes_with_party_pct": 0
        },
        {
            "party": "Republicans",
            "number_of_members": 0,
            "votes_with_party_pct": 0
        },
        {
            "party": "Independents",
            "number_of_members": 0,
            "votes_with_party_pct": 0
        },
        {
            "party": "Total",
            "number_of_members": 0,
            "votes_with_party_pct": 0
            }
        ]
}


function getTopTableInfo() {
    for (var i = 0; i < members.length; i++) {
        if (members[i].party === "D") {
            statistics.parties[0].number_of_members += 1;
            statistics.parties[0].votes_with_party_pct += members[i].votes_with_party_pct;
        } else if (members[i].party === "R") {
            statistics.parties[1].number_of_members += 1;
            statistics.parties[1].votes_with_party_pct += members[i].votes_with_party_pct;
        } else if (members[i].party === "I") {
            statistics.parties[2].number_of_members += 1;
            statistics.parties[2].votes_with_party_pct += members[i].votes_with_party_pct;
        }
        statistics.parties[3].votes_with_party_pct += members[i].votes_with_party_pct;
    }
    statistics.parties[0].votes_with_party_pct = (statistics.parties[0].votes_with_party_pct / statistics.parties[0].number_of_members).toFixed(2);
    statistics.parties[1].votes_with_party_pct = (statistics.parties[1].votes_with_party_pct / statistics.parties[1].number_of_members).toFixed(2);
    statistics.parties[3].number_of_members = members.length;
    if (statistics.parties[2].number_of_members == 0) {
        statistics.parties[2].votes_with_party_pct = 0;
        statistics.parties[3].votes_with_party_pct = ((Number(statistics.parties[0].votes_with_party_pct) + Number(statistics.parties[1].votes_with_party_pct)) / 2).toFixed(2);
    } else {
        statistics.parties[2].votes_with_party_pct = (statistics.parties[2].votes_with_party_pct / statistics.parties[2].number_of_members).toFixed(2);
        statistics.parties[3].votes_with_party_pct = (statistics.parties[3].votes_with_party_pct / members.length).toFixed(2);
    }
}

//getTopTableInfo();


//sort array of members by missed votes pct


function sortMembersByMissedVotes(members) {
    var allMembers = Array.from(members);
    allMembers.sort(function (a, b) {
        return (a.missed_votes_pct > b.missed_votes_pct) ? 1 : ((b.missed_votes_pct > a.missed_votes_pct) ? -1 : 0);
    });
    return allMembers;
}

//console.log(sortMembersByMissedVotes(members))

//calculate 10percent of members and round the number to have a cut off point

var bottom10PctMembersByMissedVotes = [];
var top10PctMembersByMissedVotes = [];

function mostEngaged(sortMembersByMissedVotes) {
    var num = Math.round(sortMembersByMissedVotes.length * 0.1);
    for (var i = 0; i < num; i++) {
        top10PctMembersByMissedVotes.push(sortMembersByMissedVotes[i]);
    }
    for (var j = num; j < sortMembersByMissedVotes.length; j++) {
        if (sortMembersByMissedVotes[j].missed_votes_pct == sortMembersByMissedVotes[num - 1].missed_votes_pct) {
            top10PctMembersByMissedVotes.push(sortMembersByMissedVotes[j]);
        }
    }

}

function leastEngaged(sortMembersByMissedVotes) {
    sortMembersByMissedVotes = Array.from(sortMembersByMissedVotes);
    sortMembersByMissedVotes.reverse();
    
    var num = Math.round(sortMembersByMissedVotes.length * 0.1);
    for (var i = 0; i < num; i++) {
        bottom10PctMembersByMissedVotes.push(sortMembersByMissedVotes[i]);
    }
    for (var j = num; j < sortMembersByMissedVotes.length; j++) {
        if (sortMembersByMissedVotes[j].missed_votes_pct == sortMembersByMissedVotes[num - 1].missed_votes_pct) {
            bottom10PctMembersByMissedVotes.push(sortMembersByMissedVotes[j]);
        }
    }
}

//mostEngaged(allMembers);
//leastEngaged(allMembers);


function createTopTable() {
    for (var i = 0; i < statistics.parties.length; i++) {
        var tr = document.createElement("tr");
        var tbody = document.getElementById("topTableBody");
        tr.insertCell().innerHTML = statistics.parties[i].party;
        tr.insertCell().innerHTML = statistics.parties[i].number_of_members;
        tr.insertCell().innerHTML = statistics.parties[i].votes_with_party_pct;
        tbody.append(tr);
    }
}

//createTopTable();


function createLeastEngagedTable() {
    for (var x = 0; x < bottom10PctMembersByMissedVotes.length; x++) {
        var tr = document.createElement("tr");
        var tbody = document.getElementById("leastEngagedBody");
        //        tr.insertCell().innerHTML  = bottom10PctMembersByMissedVotes[x].first_name + " " + (bottom10PctMembersByMissedVotes[x].middle_name || "") + " " + bottom10PctMembersByMissedVotes[x].last_name;
        tr.insertCell().innerHTML = `${bottom10PctMembersByMissedVotes[x].first_name} ${(bottom10PctMembersByMissedVotes[x].middle_name || "")} ${bottom10PctMembersByMissedVotes[x].last_name}`;
        tr.insertCell().innerHTML = bottom10PctMembersByMissedVotes[x].missed_votes;
        tr.insertCell().innerHTML = bottom10PctMembersByMissedVotes[x].missed_votes_pct;
        tbody.append(tr);
    }
}

//createLeastEngagedTable();

function createMostEngagedTable() {
    for (var x = 0; x < top10PctMembersByMissedVotes.length; x++) {
        var tr = document.createElement("tr");
        var tbody = document.getElementById("mostEngagedBody");
        //        tr.insertCell().innerHTML  = top10PctMembersByMissedVotes[x].first_name + top10PctMembersByMissedVotes[x].middle_name + top10PctMembersByMissedVotes[x].last_name;
        tr.insertCell().innerHTML = `${top10PctMembersByMissedVotes[x].first_name} ${(top10PctMembersByMissedVotes[x].middle_name || "")} ${top10PctMembersByMissedVotes[x].last_name}`;
        tr.insertCell().innerHTML = top10PctMembersByMissedVotes[x].missed_votes;
        tr.insertCell().innerHTML = top10PctMembersByMissedVotes[x].missed_votes_pct;
        tbody.append(tr);
    }
}

//createMostEngagedTable();
