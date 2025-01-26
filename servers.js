// Simulated Little Big Planet Server

// Mock levels stored on the server
const mockLevels = [
    { id: 1, title: "Escape the Jungle!", creator: "CoolCreator123", plays: 500, likes: 120 },
    { id: 2, title: "Space Adventure", creator: "GalaxyGamer", plays: 1020, likes: 800 },
    { id: 3, title: "Underwater Kingdom", creator: "AquaSack", plays: 200, likes: 75 },
];

// Mock users stored on the server
const mockUsers = {
    "Jeff_Pro_Gamer": { 
        username: "Jeff_Pro_Gamer", 
        password: "Faisal.2010", 
        levelsCreated: ["Escape the Jungle!"] 
    },
    "GalaxyGamer": { 
        username: "GalaxyGamer", 
        password: "galaxyrocks", 
        levelsCreated: ["Space Adventure"] 
    },
};

// Simulate connecting to the server
export function connectToLBPServer() {
    return new Promise((resolve) => {
        console.log("Connecting to Little Big Planet server...");
        setTimeout(() => {
            console.log("Connected to LBP server!");
            resolve();
        }, 1000); // Simulate 1-second connection delay
    });
}

// Fetch all levels from the server
export function getLevels() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockLevels);
        }, 1000); // Simulate 1-second delay
    });
}

// Fetch user data by username
export function getUserData(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = mockUsers[username];
            if (user) {
                resolve(user);
            } else {
                reject("User not found.");
            }
        }, 1000); // Simulate 1-second delay
    });
}

// Increment the play count for a level by its ID
export function incrementLevelPlays(levelId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const level = mockLevels.find((lvl) => lvl.id === levelId);
            if (level) {
                level.plays += 1; // Increment play count only when user clicks to join
                resolve(level); // Return the updated level
            } else {
                reject("Level not found.");
            }
        }, 500); // Simulate 0.5-second delay
    });
}
