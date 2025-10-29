// Load data from localStorage
let trackers = JSON.parse(localStorage.getItem('trackers')) || [];
let totalXP = parseInt(localStorage.getItem('totalXP')) || 0;
let level = Math.floor(totalXP / 100) + 1;

function saveData() {
    localStorage.setItem('trackers', JSON.stringify(trackers));
    localStorage.setItem('totalXP', totalXP);
}

function updateStats() {
    document.getElementById('level').textContent = `Level: ${level}`;
    document.getElementById('xp').textContent = `XP: ${totalXP % 100}/${100}`;
}

function renderTrackers() {
    const list = document.getElementById('trackers-list');
    list.innerHTML = '';
    trackers.forEach((tracker, index) => {
        const div = document.createElement('div');
        div.className = 'tracker';
        div.innerHTML = `
            <h3>${tracker.name}</h3>
            <p>Progress: ${tracker.current}/${tracker.target}</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${(tracker.current / tracker.target) * 100}%"></div>
            </div>
            <button class="edit-btn btn" onclick="editTracker(${index})">Edit</button>
            <button class="delete-btn btn" onclick="deleteTracker(${index})">Delete</button>
        `;
        list.appendChild(div);
    });
    updateStats();
}

function addTracker(name, current, target) {
    trackers.push({ name, current: parseInt(current), target: parseInt(target) });
    totalXP += 10; // XP for adding
    level = Math.floor(totalXP / 100) + 1;
    saveData();
    renderTrackers();
}

function editTracker(index) {
    const tracker = trackers[index];
    const newName = prompt('New name:', tracker.name);
    const newCurrent = prompt('New current:', tracker.current);
    const newTarget = prompt('New target:', tracker.target);
    if (newName && newCurrent && newTarget) {
        trackers[index] = { name: newName, current: parseInt(newCurrent), target: parseInt(newTarget) };
        totalXP += 5; // XP for editing
        level = Math.floor(totalXP / 100) + 1;
        saveData();
        renderTrackers();
    }
}

function deleteTracker(index) {
    trackers.splice(index, 1);
    saveData();
    renderTrackers();
}

document.getElementById('add-tracker-btn').addEventListener('click', () => {
    const name = prompt('Quest name:');
    const current = prompt('Current progress:');
    const target = prompt('Target progress:');
    if (name && current && target) {
        addTracker(name, current, target);
    }
});

// Initial render
renderTrackers();