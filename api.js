const API_URL = "https://iguru.co.ke/PLAYGROUND/sdg/users/login.php";

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  console.log(username, password);

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
    console.log("Server response:", data);

    if (res.ok) {
      localStorage.setItem("token", data.token);

      const playerName = data.player?.name || data.name || username;

      localStorage.setItem("player", JSON.stringify(data.player || data));

      alert("Login successful! Welcome, " + playerName);
    } else {
      alert(data.message || "Login failed. Check your credentials.");
    }

  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred during login. Please try again.");
  }
});