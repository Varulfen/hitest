const htmlElement = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

// gespeichertes Theme laden
const savedTheme = localStorage.getItem('theme') || 'light';

// Theme setzen beim Laden
htmlElement.setAttribute('data-bs-theme', savedTheme);

// Toggle korrekt initialisieren
themeToggle.checked = savedTheme === 'dark';

// Event Listener für Toggle
themeToggle.addEventListener('change', () => {
    const theme = themeToggle.checked ? 'dark' : 'light';
    htmlElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
});