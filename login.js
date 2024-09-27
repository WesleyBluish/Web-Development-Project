document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");
  
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      const data = {
        username,
        password
      };
  
      try {
        const response = await fetch("http://localhost:5500/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
  
        if (response.ok) {
          alert("Login successful!");
          window.location.href = "index.html"; // Redirect to the main page
        } else {
          alert("Invalid username or password.");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    });
  });
  