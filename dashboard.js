// 🔹 Mock Data (replace later with API)
const data = {
  activities: [
    {
      description: "Points verification completed for Game #45",
      category: "Admin",
      time_ago: "5 hours ago"
    },
    {
      description: "Jane Smith registered as a new player",
      category: "User",
      time_ago: "3 hours ago"
    },
    {
      description: "New announcement posted: Weekly Challenge",
      category: "System",
      time_ago: "1 hour ago"
    },
    {
      description: "Team Alpha updated their logo",
      category: "Team",
      time_ago: "15 mins ago"
    },
    {
      description: "John Doe achieved a new high score in Jigsaw",
      category: "Game",
      time_ago: "2 mins ago"
    }
  ],
  leaderboard: [
    { name: "Team Phoenix", score: "4500", rank: "1" },
    { name: "Sky Walkers", score: "4200", rank: "2" },
    { name: "Cyber Knights", score: "3950", rank: "3" },
    { name: "Ocean Breakers", score: "3800", rank: "4" },
    { name: "Fire Dragons", score: "3600", rank: "5" }
  ],
  announcements: [
    {
      title: "Upcoming Maintenance",
      content: "The system will be offline for 2 hours this Sunday for updates.",
      date: "2026-03-20"
    },
    {
      title: "Welcome to the SDG Dashboard",
      content: "This is a live data feed for testing the frontend integration.",
      date: "2026-03-18"
    },
    {
      title: "March Tournament Results",
      content: "Congratulations to all participants of the March games!",
      date: "2026-03-17"
    }
  ],
  stats: [
    { label: "Total Players", value: "1,240" },
    { label: "Active Teams", value: "42" },
    { label: "Games Played", value: "856" },
    { label: "Points Awarded", value: "12,450" },
    { label: "New signups (24h)", value: "18" }
  ],
};



// 🔹 Generic Renderer
function renderList(containerId, items, templateFn) {
  const container = document.getElementById(containerId);
  container.innerHTML = items.map(templateFn).join("");
}

// 🔹 Templates
const templates = {

  stat: (item) => `
    <div class="table-card">
      <p>${item.label}</p>
      <h2>${item.value}</h2>
    </div>
  `,

  activity: (item) => `
    <div class="activity-item">
      <p>${item.description}</p>
      <small>${item.category} • ${item.time_ago}</small>
    </div>
  `,

  leaderboard: (item) => `
    <div class="table-row">
      <div>${item.rank}</div>
      <p>${item.name}</p>
      <strong>${item.score}</strong>
    </div>
  `,

  announcement: (item) => `
    <div class="table-row">
      <h4>${item.title}</h4>
      <p>${item.content}</p>
      <small>${item.date}</small>
    </div>
  `
};

function initDashboard(data) {
  renderList("stats", data.stats, templates.stat);
  renderList("activities", data.activities, templates.activity);
  renderList("leaderboard", data.leaderboard, templates.leaderboard);
  renderList("announcements", data.announcements, templates.announcement);
}



// 🚀 Run
initDashboard(data);


// 🔹 Optional Logout
function logout() {
  alert(" Logout successful!");
  alert("Logged out successfully!",);
  alert("Invalid password!", "error");
  alert("Check your input!", "warning");
   window.location.href = "login.html";

   
}