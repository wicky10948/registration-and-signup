const teamsTable = document.getElementById("teamsTable");

// Load from localStorage OR default data
let teams = JSON.parse(localStorage.getItem("teams")) || [
    {
        id: 1,
        name: "Alpha",
        points: 120,
        players: [
            { id: 1, name: "John", score: 50 },
            { id: 2, name: "Mike", score: 70 }
        ]
    },
    {
        id: 2,
        name: "Bravo",
        points: 150,
        players: [
            { id: 1, name: "Chris", score: 80 }
        ]
    },
    {
        id: 3,
        name: "Charlie",
        points: 180,
        players: [
            { id: 1, name: "Sarah", score: 90 }
        ]
    }
];

let selectedTeamId = null;

// Save to localStorage
function saveToStorage() {
    localStorage.setItem("teams", JSON.stringify(teams));
}

// Load Teams
function loadTeams() {
    teamsTable.innerHTML = "";

    teams.sort((a, b) => b.points - a.points);

    teams.forEach((team, index) => {
        teamsTable.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>
                <span class="team-link" onclick="viewPlayers(${team.id})">
                    ${team.name}
                </span>
            </td>
            <td>${team.points}</td>
            <td>
                <button class="btn primary" onclick="editTeam(${team.id})">Edit</button>
                <button class="btn danger" onclick="deleteTeam(${team.id})">Delete</button>
            </td>
        </tr>
        `;
    });
}

loadTeams();

// Show form
document.getElementById("addTeamBtn").onclick = () => {
    document.getElementById("teamId").value = "";
    document.getElementById("teamName").value = "";
    document.getElementById("teamPoints").value = "";
    document.getElementById("formTitle").innerText = "Add Team";

    document.getElementById("teamForm").classList.remove("hidden");
};

// Edit Team
function editTeam(id) {
    let team = teams.find(t => t.id === id);

    document.getElementById("teamId").value = team.id;
    document.getElementById("teamName").value = team.name;
    document.getElementById("teamPoints").value = team.points;

    document.getElementById("formTitle").innerText = "Edit Team";
    document.getElementById("teamForm").classList.remove("hidden");
}

// Save Team
function saveTeam() {
    let id = document.getElementById("teamId").value;
    let name = document.getElementById("teamName").value;
    let points = Number(document.getElementById("teamPoints").value);

    if (!name || isNaN(points)) return alert("Enter valid details");

    if (id === "") {
        teams.push({
            id: teams.length + 1,
            name,
            points,
            players: []
        });
    } else {
        let team = teams.find(t => t.id == id);
        team.name = name;
        team.points = points;
    }

    saveToStorage();
    loadTeams();
    closeTeamForm();
}

// Delete Team
function deleteTeam(id) {
    if (!confirm("Delete team?")) return;

    teams = teams.filter(t => t.id !== id);

    saveToStorage();
    loadTeams();

    document.getElementById("playersSection").classList.add("hidden");
}

function closeTeamForm() {
    document.getElementById("teamForm").classList.add("hidden");
}


// View Players
function viewPlayers(teamId) {
    selectedTeamId = teamId;

    let team = teams.find(t => t.id === teamId);
    let table = document.getElementById("playersTable");

    table.innerHTML = "";

    team.players.forEach((player, index) => {
        table.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${player.name}</td>
            <td>${player.score}</td>
            <td>
                <button class="btn primary" onclick="editPlayer(${player.id})">Edit</button>
                <button class="btn danger" onclick="deletePlayer(${player.id})">Delete</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("playersSection").classList.remove("hidden");
}

// Show Player Form
function showPlayerForm() {
    document.getElementById("playerId").value = "";
    document.getElementById("playerName").value = "";
    document.getElementById("playerScore").value = "";

    document.getElementById("playerForm").classList.remove("hidden");
}

// Edit Player
function editPlayer(playerId) {
    let team = teams.find(t => t.id === selectedTeamId);
    let player = team.players.find(p => p.id === playerId);

    document.getElementById("playerId").value = player.id;
    document.getElementById("playerName").value = player.name;
    document.getElementById("playerScore").value = player.score;

    document.getElementById("playerForm").classList.remove("hidden");
}

// Save Player
function savePlayer() {
    let id = document.getElementById("playerId").value;
    let name = document.getElementById("playerName").value;
    let score = Number(document.getElementById("playerScore").value);

    let team = teams.find(t => t.id === selectedTeamId);

    if (!name || isNaN(score)) return alert("Enter valid details");

    if (id === "") {
        team.players.push({
            id: team.players.length + 1,
            name,
            score
        });
    } else {
        let player = team.players.find(p => p.id == id);
        player.name = name;
        player.score = score;
    }

    saveToStorage();
    viewPlayers(selectedTeamId);
    closePlayerForm();
}

// Delete Player
function deletePlayer(playerId) {
    if (!confirm("Delete player?")) return;

    let team = teams.find(t => t.id === selectedTeamId);
    team.players = team.players.filter(p => p.id !== playerId);

    saveToStorage();
    viewPlayers(selectedTeamId);
}

function closePlayerForm() {
    document.getElementById("playerForm").classList.add("hidden");
}