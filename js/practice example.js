document.getElementById('rep').addEventListener('click', filter);
document.getElementById('dem').addEventListener('click', filter);


var members = data.results[0].members;


var row = document.createElement("tr");
var row = document.createElement("td");


function createTable() {
    for (var i = 0; i < members.length; i++) {
        var row = document.createElement("tr");

        row.insertCell().innerHTML = members[i].first_name + ' ' + members[i].middle_name + ' ' + members[i].last_name;
        row.insertCell().innerHTML = members[i].party;
        row.insertCell().innerHTML = members[i].state;
        row.insertCell().innerHTML = members[i].seniority;

        document.getElementById("table").append(row);

    }

}


var noDuplicateStates = [... new Set (members.map(function(member)return member.state)).sort()];

noDuplicateStates

createTable();

function filter() {
    //    var repCb = document.getElementById("rep");
    //    var demCb = document.getElementById("dem");

    //    var checkBoxesChecked = [];
    //    
    //    if (repCb.checked) {
    //        checkBoxesChecked.push('R');
    //    }
    //    
    //    if (demCb.checked) {
    //        checkBoxesChecked.push('D');
    //    }

    // Getting the elements in a different way

    var cboxes = Array.from(document.querySelectorAll("input[name=party]:checked"));
    .map(function (element)) {
        return element.value;
    }
         
    var stateSelector = document.getElementsById('selector');     

    var filteredMembers = [];
    
    var filteredTest =  members.filter(function(member) {
    var partyFilter = cboxes.includes(member.party);
        var stateFilter = stateSelector.value == member.state || stateSelector.value == 'All';
        
        return members.party == 'D';
        return cboxes.includes(member.party);
        return partyFilter && stateFilter;
    }
                  )
    

    for (var i = 0; i < members.length; i++) {
        if (cboxes.includes(members[i].party) && stateSelector.value == members[i].state) {
            filteredMembers.push(members[i])
        }



    }

console.log(filteredMembers);
    
    updateTable(filteredMembers);
}


function updateTable(filteredMembers) {
    
    document.getElementById("table").innerHTML = "";
    
    for (var i = 0; i < members.length; i++) {
        var row = document.createElement("tr");

        row.insertCell().innerHTML = members[i].first_name + ' ' + members[i].middle_name + ' ' + members[i].last_name;
        row.insertCell().innerHTML = members[i].party;
        row.insertCell().innerHTML = members[i].state;
        row.insertCell().innerHTML = members[i].seniority;

        document.getElementById("table").append(row);

    }
    
    
    
    
}


console.log(cboxes);
console.log(checkBoxesChecked);


}
