// script.js

let currentUser = null;
let levelStats = JSON.parse(localStorage.getItem("levelStats")) || [];

// Simulate a basic user authentication system
const users = {
    'Jeff_Pro_Gamer': 'Faisal.2010',
};

document.getElementById('signInBtn').addEventListener('click', showSignInForm);
document.getElementById('signUpBtn').addEventListener('click', showSignUpForm);
document.getElementById('logoutBtn').addEventListener('click', logOutUser);

function showSignInForm() {
    document.getElementById('mainContent').innerHTML = `
        <h2>Sign In</h2>
        <label for="username">Username:</label>
        <input type="text" id="signInUsername"><br><br>
        <label for="password">Password:</label>
        <input type="password" id="signInPassword"><br><br>
        <button id="signInSubmitBtn">Sign In</button>
    `;
    
    document.getElementById('signInSubmitBtn').addEventListener('click', signIn);
}

function showSignUpForm() {
    document.getElementById('mainContent').innerHTML = `
        <h2>Sign Up</h2>
        <label for="username">Username:</label>
        <input type="text" id="signUpUsername"><br><br>
        <label for="password">Password:</label>
        <input type="password" id="signUpPassword"><br><br>
        <button id="signUpSubmitBtn">Sign Up</button>
    `;
    
    document.getElementById('signUpSubmitBtn').addEventListener('click', signUp);
}

function signIn() {
    const username = document.getElementById('signInUsername').value;
    const password = document.getElementById('signInPassword').value;
    
    if (users[username] === password) {
        currentUser = username;
        updateUI();
    } else {
        alert('Incorrect username or password');
    }
}

function signUp() {
    const username = document.getElementById('signUpUsername').value;
    const password = document.getElementById('signUpPassword').value;

    if (username && password) {
        users[username] = password;
        currentUser = username;
        alert('Account created!');
        updateUI();
    }
}

function logOutUser() {
    currentUser = null;
    updateUI();
}

function updateUI() {
    if (currentUser) {
        document.getElementById('authSection').innerHTML = `<button id="logoutBtn">Log Out</button>`;
        document.getElementById('mainContent').innerHTML = `
            <h2>Welcome, ${currentUser}</h2>
            <p>You can now submit your levels below!</p>
        `;
        document.getElementById('levelSubmissionSection').style.display = 'block';
        loadLevelStats();
    } else {
        document.getElementById('authSection').innerHTML = `
            <button id="signInBtn">Sign In</button>
            <button id="signUpBtn">Sign Up</button>
        `;
        document.getElementById('mainContent').innerHTML = '';
        document.getElementById('levelSubmissionSection').style.display = 'none';
    }
}

document.getElementById('levelForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const levelID = document.getElementById('levelID').value;
    const levelName = document.getElementById('levelName').value;
    const levelPlays = document.getElementById('levelPlays').value;
    const levelLikes = document.getElementById('levelLikes').value;

    const newLevel = {
        user: currentUser,
        levelID,
        levelName,
        levelPlays: parseInt(levelPlays),
        levelLikes: parseInt(levelLikes)
    };

    levelStats.push(newLevel);
    localStorage.setItem("levelStats", JSON.stringify(levelStats));
    loadLevelStats();
});

function loadLevelStats() {
    const levelStatsContainer = document.getElementById('levelStats');
    levelStatsContainer.innerHTML = '';
    
    levelStats.filter(level => level.user === currentUser).forEach(level => {
        const levelDiv = document.createElement('div');
        levelDiv.innerHTML = `
            <strong>${level.levelName}</strong> (ID: ${level.levelID})<br>
            Plays: ${level.levelPlays} | Likes: ${level.levelLikes}
            <hr>
        `;
        levelStatsContainer.appendChild(levelDiv);
    });
}

// Initialize UI on page load
updateUI();
