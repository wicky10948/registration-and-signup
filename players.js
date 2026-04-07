    const teamsTable = document.getElementById("teamsTable");

    let teams = [
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
        }
    ];

    let selectedTeamId = null;

    /* ================= TEAM FUNCTIONS ================= */

    // Load teams
    function loadTeams() {
        teamsTable.innerHTML = "";

        // Sort by highest points
        teams.sort((a, b) => b.points - a.points);

        teams.forEach((team, index) => {
            let row = `
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
                    </td>
                </tr>
            `;
            teamsTable.innerHTML += row;
        });
    }

    loadTeams();

    // Show add form
    document.getElementById("addTeamBtn").onclick = () => {
        document.getElementById("teamId").value = "";
        document.getElementById("teamName").value = "";
        document.getElementById("teamPoints").value = "";
        document.getElementById("formTitle").innerText = "Add Team";

        document.getElementById("teamForm").classList.remove("hidden");
    };

    // Edit team
    function editTeam(id) {
        let team = teams.find(t => t.id === id);

        document.getElementById("teamId").value = team.id;
        document.getElementById("teamName").value = team.name;
        document.getElementById("teamPoints").value = team.points;
        document.getElementById("formTitle").innerText = "Edit Team";

        document.getElementById("teamForm").classList.remove("hidden");
    }

    // Save team
    function saveTeam() {
        let id = document.getElementById("teamId").value;
        let name = document.getElementById("teamName").value;
        let points = Number(document.getElementById("teamPoints").value);

        if (!name || isNaN(points)) {
            alert("Enter valid details");
            return;
        }

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

        loadTeams();
        closeTeamForm();
    }

    function closeTeamForm() {
        document.getElementById("teamForm").classList.add("hidden");
    }

    /* ================= PLAYER FUNCTIONS ================= */

    // View players
    function viewPlayers(teamId) {
        selectedTeamId = teamId;

        let team = teams.find(t => t.id === teamId);
        let table = document.getElementById("playersTable");

        table.innerHTML = "";

        team.players.forEach((player, index) => {
            let row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${player.name}</td>
                    <td>${player.score}</td>
                    <td>
                        <button class="btn primary" onclick="editPlayer(${player.id})">Edit</button>
                    </td>
                </tr>
            `;
            table.innerHTML += row;
        });

        document.getElementById("playersSection").classList.remove("hidden");
    }

    // Show player form
    function showPlayerForm() {
        document.getElementById("playerId").value = "";
        document.getElementById("playerName").value = "";
        document.getElementById("playerScore").value = "";

        document.getElementById("playerForm").classList.remove("hidden");
    }

    // Edit player
    function editPlayer(playerId) {
        let team = teams.find(t => t.id === selectedTeamId);
        let player = team.players.find(p => p.id === playerId);

        document.getElementById("playerId").value = player.id;
        document.getElementById("playerName").value = player.name;
        document.getElementById("playerScore").value = player.score;

        document.getElementById("playerForm").classList.remove("hidden");
    }

    // Save player
    function savePlayer() {
        let id = document.getElementById("playerId").value;
        let name = document.getElementById("playerName").value;
        let score = Number(document.getElementById("playerScore").value);

        let team = teams.find(t => t.id === selectedTeamId);

        if (!name || isNaN(score)) {
            alert("Enter valid player details");
            return;
        }

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

        viewPlayers(selectedTeamId);
        closePlayerForm();
    }

    function closePlayerForm() {
        document.getElementById("playerForm").classList.add("hidden");
    }