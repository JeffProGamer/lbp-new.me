import { connectToLBPServer, getLevels, incrementLevelPlays } from './servers.js';

document.addEventListener("DOMContentLoaded", async () => {
    const levelsContainer = document.getElementById("all-levels");

    try {
        // Connect to the server
        await connectToLBPServer();

        // Fetch levels
        const levels = await getLevels();

        // Display levels
        levelsContainer.innerHTML = ""; // Clear "Loading..."
        levels.forEach((level) => {
            const levelDiv = document.createElement("div");
            levelDiv.classList.add("level");
            levelDiv.innerHTML = `
                <h3>${level.title}</h3>
                <p>Creator: ${level.creator}</p>
                <p>Plays: <span id="plays-${level.id}">${level.plays}</span></p>
                <p>Likes: ${level.likes}</p>
                <button class="join-level-btn" data-level-id="${level.id}">Play Level</button>
            `;
            levelsContainer.appendChild(levelDiv);
        });

        // Add event listeners to "Play Level" buttons
        const playButtons = document.querySelectorAll(".join-level-btn");
        playButtons.forEach((button) => {
            button.addEventListener("click", async (event) => {
                const levelId = parseInt(event.target.getAttribute("data-level-id"));

                try {
                    // Increment play count for the level
                    const updatedLevel = await incrementLevelPlays(levelId);

                    // Update play count in the UI
                    const playCountElement = document.getElementById(`plays-${levelId}`);
                    playCountElement.textContent = updatedLevel.plays;

                    alert(`You played "${updatedLevel.title}". Total plays: ${updatedLevel.plays}`);
                } catch (error) {
                    alert(error);
                }
            });
        });
    } catch (error) {
        levelsContainer.innerHTML = `<p>Error loading levels: ${error}</p>`;
    }
});
