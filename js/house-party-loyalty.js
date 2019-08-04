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


        leastLoyal(sortMembersByVotesWithPartyPct(members));
        createLeastLoyalTable();
        mostLoyal(sortMembersByVotesWithPartyPct(members));
        createMostLoyalTable();


    })





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


//var members = data.results[0].members;

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

//sort array of members by missed votes pct


function sortMembersByVotesWithPartyPct(members) {
    var allMembers = Array.from(members);
    allMembers.sort(function (a, b) {
        return (a.votes_with_party_pct > b.votes_with_party_pct) ? 1 : ((b.votes_with_party_pct > a.votes_with_party_pct) ? -1 : 0);
    });
    return allMembers;
}

//calculate 10percent of members and round the number to have a cut off point

var bottom10PctMembersByVotesWithParty = [];
var top10PctMembersByVotesWithParty = [];

function mostLoyal(sortMembersByVotesWithPartyPct) {
    var num = Math.round(sortMembersByVotesWithPartyPct.length * 0.1);
    for (var i = 0; i < num; i++) {
        top10PctMembersByVotesWithParty.push(sortMembersByVotesWithPartyPct[i]);
    }
    for (var j = num; j < sortMembersByVotesWithPartyPct.length; j++) {
        if (sortMembersByVotesWithPartyPct[j].missed_votes_pct == sortMembersByVotesWithPartyPct[num - 1].missed_votes_pct) {
            top10PctMembersByVotesWithParty.push(sortMembersByVotesWithPartyPct);
        }
    }

}


function leastLoyal(sortMembersByVotesWithPartyPct) {
    sortMembersByVotesWithPartyPct = Array.from(sortMembersByVotesWithPartyPct);
    sortMembersByVotesWithPartyPct.reverse();
    
    var num = Math.round(sortMembersByVotesWithPartyPct.length * 0.1);
    for (var i = 0; i < num; i++) {
        bottom10PctMembersByVotesWithParty.push(sortMembersByVotesWithPartyPct[i]);
    }
    for (var j = num; j < sortMembersByVotesWithPartyPct.length; j++) {
        if (sortMembersByVotesWithPartyPct[j].missed_votes_pct == sortMembersByVotesWithPartyPct[num - 1].missed_votes_pct) {
            bottom10PctMembersByVotesWithParty.push(sortMembersByVotesWithPartyPct);
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

//mostLoyal(allMembers);
//leastLoyal(allMembers);

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


function createLeastLoyalTable() {
    for (x = 0; x < bottom10PctMembersByVotesWithParty.length; x++) {
        var tr = document.createElement("tr");
        var tbody = document.getElementById("leastLoyalBody");
        //        tr.insertCell().innerHTML  = bottom10PctMembersByVotesWithParty[x].first_name + " " + (bottom10PctMembersByVotesWithParty[x].middle_name || "") + " " + bottom10PctMembersByVotesWithParty[x].last_name;
        tr.insertCell().innerHTML = `${bottom10PctMembersByVotesWithParty[x].first_name} ${(bottom10PctMembersByVotesWithParty[x].middle_name || "")} ${bottom10PctMembersByVotesWithParty[x].last_name}`;
        tr.insertCell().innerHTML = bottom10PctMembersByVotesWithParty[x].missed_votes;
        tr.insertCell().innerHTML = bottom10PctMembersByVotesWithParty[x].votes_with_party_pct;
        tbody.append(tr);
    }
}

//createLeastLoyalTable();

function createMostLoyalTable() {
    for (x = 0; x < top10PctMembersByVotesWithParty.length; x++) {
        var tr = document.createElement("tr");
        var tbody = document.getElementById("mostLoyalBody");
        //        tr.insertCell().innerHTML  = top10PctMembersByMissedVotes[x].first_name + top10PctMembersByMissedVotes[x].middle_name + top10PctMembersByMissedVotes[x].last_name;
        tr.insertCell().innerHTML = `${top10PctMembersByVotesWithParty[x].first_name} ${(top10PctMembersByVotesWithParty[x].middle_name || "")} ${top10PctMembersByVotesWithParty[x].last_name}`;
        tr.insertCell().innerHTML = top10PctMembersByVotesWithParty[x].missed_votes;
        tr.insertCell().innerHTML = top10PctMembersByVotesWithParty[x].votes_with_party_pct;
        tbody.append(tr);
    }
}

//createMostLoyalTable();
