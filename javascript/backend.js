import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const button = document.getElementById('userDropdownButton');
const menu = document.getElementById('userDropdownMenu');

let userSelected = false;
let currentUserId = -1;
let usersLoaded = false;
let cachedUserData = [];
let cachedStats = [];

const supabase = createClient(
    'https://jskvlcfmhjjgxpzzkeqx.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impza3ZsY2ZtaGpqZ3hwenprZXF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwOTM0NDMsImV4cCI6MjA4OTY2OTQ0M30.OY51pm2jTVIVE0WpNEbY3zO1WrI8BlyuqNUz3by9xNo'
)

async function loadUsers(){
    if(!usersLoaded) {
        const {data, error} = await supabase
            .from('user')
            .select('*');

        if (error) {
            console.error(error)
            return []
        }
        usersLoaded = true;
        cachedUserData = data;
    }
    return cachedUserData;
}


async function loadStats(){
    if(!usersLoaded) {
        const {data, error} = await supabase
            .from('user_stats')
            .select('*');

        if (error) {
            console.error(error)
            return []
        }
        cachedStats = data;
    }
    return cachedStats;
}


async function initDropdown() {
    const users = await loadUsers();

    menu.innerHTML = '';

    users.forEach(user => {
        const li = document.createElement('li');

        const a = document.createElement('a');
        a.className = 'dropdown-item';
        a.href = '#';
        a.textContent = user.name;

        a.addEventListener('click', (e) => {
            e.preventDefault();
            currentUserId = user.id;
            userSelected = true;
            // Button-Text ändern
            button.textContent = user.name;
            // speichern (optional)
            localStorage.setItem('selectedUserId', user.id);
        });

        li.appendChild(a);
        menu.appendChild(li);
    });

    if(users.length === 0) {
        const liPlaceholder = document.createElement('li');

        const aPlaceholder = document.createElement('a');
        aPlaceholder.className = 'dropdown-item disabled';
        aPlaceholder.href = '#';
        aPlaceholder.textContent = "keine User vorhanden";

        aPlaceholder.addEventListener('click', (e) => {
            e.preventDefault();
            userSelected = false;
            currentUserId = -1;

            // Button-Text ändern
            //button.textContent = "User auswählen";

            // speichern (optional)
            localStorage.removeItem('selectedUserId');
        });

        liPlaceholder.appendChild(aPlaceholder);
        menu.appendChild(liPlaceholder);
    }
    else {
        const liLogout = document.createElement('li');

        const aLogout = document.createElement('a');
        aLogout.className = 'dropdown-item';
        aLogout.href = '#';
        aLogout.textContent = "User abwählen";

        aLogout.addEventListener('click', (e) => {
            e.preventDefault();
            currentUserId = -1;
            userSelected = false;
            // Button-Text ändern
            button.textContent = "User auswählen";
            // speichern (optional)
            localStorage.removeItem('selectedUserId');
        });

        liLogout.appendChild(aLogout);
        menu.appendChild(liLogout);
    }

    // gespeicherten User wiederherstellen
    const localStorageUserId = localStorage.getItem('selectedUserId');
    console.log(cachedUserData);
    if (localStorageUserId) {
        const user = cachedUserData.find(
            u => String(u.id) === String(localStorageUserId)
        );
        if(user) {
            currentUserId = localStorageUserId;
            button.textContent = user.name;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initDropdown();
    setTimeout(() => {
        updateDatabaseTracking();
    }, 3000)
});







async function updateDatabaseTracking() {
    if (!currentUserId || currentUserId === -1) return;

    const { data, error } = await supabase
        .from('user_stats')
        .upsert({
            user_id: currentUserId,
            songs_count: songCounter,
            total_seconds: totalDurationSeconds
        }, {
            onConflict: 'user_id'
        });

    if (error) {
        showMessage("Fehler beim Speichern:" + error);
    }
}

setInterval(() => {
    updateDatabaseTracking();
}, 10000000); // alle 10 Sekunden

window.addEventListener('beforeunload', () => {
    updateDatabaseTracking();
});