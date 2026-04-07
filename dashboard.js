const data = {
    stats: [
        { label: "Total Players", value: "0" },
        { label: "Active Teams", value: "0" },
        { label: "Games Played", value: "0" },
        { label: "Points Awarded", value: "0" }
    ],

    activities: [
        "Team Alpha won against Team Beta",
        "New team 'Warriors' registered",
        "Leaderboard updated"
    ],

    leaderboard: [
        { team: "Alpha", points: 0 },
        { team: "Bravo", points: 0 },
        { team: "Charlie", points: 0 },
        { team: "Delta", points: 0 }
    ],

    announcements: [
        { title: "New Tournament", message: "Register before Friday!" },
        { title: "Maintenance", message: "System downtime at 10PM" },
        { title: "Update", message: "New scoring rules applied" }
    ]
};


//  Load Dashboard Summary
const summaryContainer = document.getElementById("total-games");

data.stats.forEach(stat => {
    const card = document.createElement("div");
    card.classList.add("stats");

    card.innerHTML = `
        <h3>${stat.value}</h3>
        <p>${stat.label}</p>
    `;

    summaryContainer.appendChild(card);
});


//  Load Activities
const activitiesContainer = document.getElementById("activities");

const activitiesTitle = document.createElement("h2");
activitiesTitle.textContent = "Recent Activities";
activitiesContainer.appendChild(activitiesTitle);

const activityList = document.createElement("ul");

data.activities.forEach(activity => {
    const li = document.createElement("li");
    li.textContent = activity;
    activityList.appendChild(li);
});

activitiesContainer.appendChild(activityList);


//  Load Leaderboard
const leaderboardContainer = document.getElementById("leaderboard");

const leaderboardTitle = document.createElement("h2");
leaderboardTitle.textContent = "Leaderboard";
leaderboardContainer.appendChild(leaderboardTitle);

const table = document.createElement("table");

table.innerHTML = `
    <thead>
        <tr>
            <th>#</th>
            <th>Team</th>
            <th>Points</th>
        </tr>
    </thead>
`;

const tbody = document.createElement("tbody");

data.leaderboard.forEach((team, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${team.team}</td>
        <td>${team.points}</td>
    `;

    tbody.appendChild(row);
});

table.appendChild(tbody);
leaderboardContainer.appendChild(table);


//  Load Announcements
const announcementsContainer = document.getElementById("announcements");

const announcementTitle = document.createElement("h2");
announcementTitle.textContent = "Announcements";
announcementsContainer.appendChild(announcementTitle);

data.announcements.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("announcement-card");

    card.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.message}</p>
    `;

    announcementsContainer.appendChild(card);
});


//  Logout Function
const logoutBtn = document.querySelector(".signout-button");

logoutBtn.addEventListener("click", () => {
    alert("Logging out...");
    
    // Example: redirect to login page
    window.location.href = "login.html";
});