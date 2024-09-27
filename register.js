document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.querySelector("form");
  
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const email = document.getElementById("email").value;
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      const data = {
        email,
        username,
        password
      };
  
      try {
        const response = await fetch("http://localhost:5500/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
  
        if (response.ok) {
          alert("Registration successful!");
          window.location.href = "login.html"; // Redirect to login page
        } else {
          alert("Registration failed, please try again.");
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    });
  });
  