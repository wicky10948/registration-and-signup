const API_URL = "https://iguru.co.ke/PLAYGROUND/sdg/users/login.php";

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    console.log("Status:", res.status);
    console.log("Response:", data);

    // ✅ Check for actual success using token (more reliable than res.ok alone)
    if (data.token) {
      // Save auth data
      localStorage.setItem("token", data.token);

      const playerName = data.player?.name || data.name || username;
      localStorage.setItem("player", JSON.stringify(data.player || data));

      // Optional success message
      alert("Login successful! Welcome, " + playerName);

      // Redirect to dashboard (use absolute path to avoid path issues)
      window.location.href = "home.html";

    } else {
      alert(data.message || "Login failed. Check your credentials.");
    }

  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred during login. Please try again.");
  }
});