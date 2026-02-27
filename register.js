const API_URL = "https://iguru.co.ke/PLAYGROUND/sdg/users/register.php"; 
// If your API endpoint is different, change it here

document.getElementById("register").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    console.log("Server response:", data);

    if (res.ok) {
      alert(data.message || "Registration successful!");
      window.location.href = "login.html";
    } else {
      alert(data.message || "Registration failed.");
    }

  } catch (error) {
    console.error("Registration error:", error);
    alert("An error occurred. Please try again.");
  }
});