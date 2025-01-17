// Simulated database of levels from the game
const levels = [
    { title: "Epic Adventure", creator: "Jeff_Pro_Gamer", plays: 105, likes: 89 },
    { title: "Space Quest", creator: "LevelMaker99", plays: 200, likes: 150 },
    { title: "Underwater Escape", creator: "CoolPlayer", plays: 75, likes: 40 },
    { title: "Jungle Dash", creator: "Jeff_Pro_Gamer", plays: 50, likes: 30 },
  ];
  
  // Simulated user data
  let currentUser = null;
  
  // DOM elements
  const featuredLevels = document.getElementById("featured-levels");
  const levelListContainer = document.getElementById("level-list");
  const userLevelsContainer = document.getElementById("user-levels");
  const authMessage = document.getElementById("auth-message");
  
  // Auto-refresh every 30 seconds
  setInterval(() => displayAllLevels(), 30000);
  
  // Display all levels
  function displayAllLevels() {
    levelListContainer.innerHTML = "";
    levels.forEach(level => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${level.title}</h3>
        <p>Creator: ${level.creator}</p>
        <p>Plays: ${level.plays} | Likes: ${level.likes}</p>`;
      levelListContainer.appendChild(div);
    });
  }
  
  // Display user levels
  function displayUserLevels(username) {
    const userLevels = levels.filter(level => level.creator === username);
    userLevelsContainer.innerHTML = "";
    userLevels.forEach(level => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${level.title}</h3>
        <p>Plays: ${level.plays} | Likes: ${level.likes}</p>`;
      userLevelsContainer.appendChild(div);
    });
  }
  
  // Authentication
  document.getElementById("auth-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    if (/^[a-zA-Z][a-zA-Z0-9]*$/.test(username)) {
      currentUser = username;
      document.getElementById("profile-username").textContent = username;
      authMessage.textContent = `✅ Welcome, ${username}!`;
      displayUserLevels(username);
    } else {
      authMessage.textContent = "❌ Invalid username! Must start with a letter.";
    }
  });
  
  // Initial display
  displayAllLevels();
  