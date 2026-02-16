// ============================================
// VARIABILI GLOBALI
// ============================================
let gameSettings = {
    playerName: 'Giocatore',
    difficulty: 'medium',
    category: 'all',
    soundEnabled: true
};

// ============================================
// FUNZIONI MENU PRINCIPALE
// ============================================

function startGame() {
    saveSettingsToStorage();
    window.location.href = 'game.html';
}

function viewRecords() {
    window.location.href = 'records.html';
}

function viewHelp() {
    window.location.href = 'help.html';
}

function viewSettings() {
    loadSettings();
    document.getElementById('settingsModal').classList.add('show');
}

function closeSettings() {
    document.getElementById('settingsModal').classList.remove('show');
}

// ============================================
// GESTIONE IMPOSTAZIONI
// ============================================

function loadSettings() {
    // Carica le impostazioni dal localStorage
    const savedSettings = localStorage.getItem('gameSettings');
    if (savedSettings) {
        gameSettings = JSON.parse(savedSettings);
    }
    
    // Popola i campi del form
    document.getElementById('playerName').value = gameSettings.playerName;
    document.getElementById('difficulty').value = gameSettings.difficulty;
    document.getElementById('questionCategory').value = gameSettings.category;
    document.getElementById('soundEnabled').checked = gameSettings.soundEnabled;
}

function saveSettings() {
    // Raccogli i dati dal form
    gameSettings.playerName = document.getElementById('playerName').value || 'Giocatore';
    gameSettings.difficulty = document.getElementById('difficulty').value;
    gameSettings.category = document.getElementById('questionCategory').value;
    gameSettings.soundEnabled = document.getElementById('soundEnabled').checked;
    
    // Salva nel localStorage
    saveSettingsToStorage();
    
    // Mostra feedback
    alert('Impostazioni salvate con successo!');
    closeSettings();
}

function saveSettingsToStorage() {
    localStorage.setItem('gameSettings', JSON.stringify(gameSettings));
}

// ============================================
// GESTIONE CLASSIFICA
// ============================================

function saveScore(score, questionsAnswered) {
    let records = JSON.parse(localStorage.getItem('gameRecords')) || [];
    
    const newRecord = {
        playerName: gameSettings.playerName,
        score: score,
        questionsAnswered: questionsAnswered,
        date: new Date().toISOString(),
        difficulty: gameSettings.difficulty
    };
    
    records.push(newRecord);
    
    // Ordina per punteggio decrescente
    records.sort((a, b) => b.score - a.score);
    
    // Mantieni solo i top 10
    records = records.slice(0, 10);
    
    localStorage.setItem('gameRecords', JSON.stringify(records));
}

function getRecords() {
    return JSON.parse(localStorage.getItem('gameRecords')) || [];
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatCurrency(amount) {
    return new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0
    }).format(amount);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ============================================
// EFFETTI SONORI (placeholder per future implementazioni)
// ============================================

function playSound(soundType) {
    if (!gameSettings.soundEnabled) return;
    
    // Qui puoi aggiungere i suoni reali
    console.log('Playing sound:', soundType);
}

// ============================================
// INIZIALIZZAZIONE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Carica le impostazioni salvate
    const savedSettings = localStorage.getItem('gameSettings');
    if (savedSettings) {
        gameSettings = JSON.parse(savedSettings);
    }
    
    // Chiudi i modal cliccando fuori
    window.onclick = function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.classList.remove('show');
            }
        });
    };
});

// ============================================
// GESTIONE KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', function(e) {
    // ESC per chiudere i modal
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => modal.classList.remove('show'));
    }
});
