// ============================================
// VARIABILI GLOBALI DEL GIOCO
// ============================================

let currentQuestion = 0;
let score = 0;
let questions = [];
let usedLifelines = {
    fiftyFifty: false,
    askAudience: false,
    phoneCall: false
};
let timer;
let timeLeft = 30;
let selectedAnswer = null;

const prizeLadder = [
    { level: 1, amount: 100, safeHaven: false },
    { level: 2, amount: 200, safeHaven: false },
    { level: 3, amount: 300, safeHaven: false },
    { level: 4, amount: 500, safeHaven: false },
    { level: 5, amount: 1000, safeHaven: true },
    { level: 6, amount: 2000, safeHaven: false },
    { level: 7, amount: 4000, safeHaven: false },
    { level: 8, amount: 8000, safeHaven: false },
    { level: 9, amount: 16000, safeHaven: false },
    { level: 10, amount: 32000, safeHaven: true },
    { level: 11, amount: 64000, safeHaven: false },
    { level: 12, amount: 125000, safeHaven: false },
    { level: 13, amount: 250000, safeHaven: false },
    { level: 14, amount: 500000, safeHaven: false },
    { level: 15, amount: 1000000, safeHaven: false }
];

// ============================================
// INIZIALIZZAZIONE GIOCO
// ============================================

async function initGame() {
    loadGameSettings();
    await loadQuestions();
    setupPrizeLadder();
    displayQuestion();
    updateUI();
}

function loadGameSettings() {
    const savedSettings = localStorage.getItem('gameSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        document.getElementById('playerNameDisplay').textContent = settings.playerName;
    }
}

async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        const data = await response.json();
        
        // Filtra le domande in base alle impostazioni
        const settings = JSON.parse(localStorage.getItem('gameSettings')) || {};
        let filteredQuestions = data.questions;
        
        if (settings.category && settings.category !== 'all') {
            filteredQuestions = filteredQuestions.filter(q => q.category === settings.category);
        }
        
        // Mescola le domande
        questions = shuffleArray(filteredQuestions).slice(0, 15);
        
    } catch (error) {
        console.error('Errore nel caricamento delle domande:', error);
        // Domande di fallback
        questions = getDefaultQuestions();
    }
}

function setupPrizeLadder() {
    const prizesList = document.getElementById('prizesList');
    prizesList.innerHTML = '';
    
    prizeLadder.forEach((prize, index) => {
        const prizeItem = document.createElement('div');
        prizeItem.className = 'prize-item';
        if (prize.safeHaven) {
            prizeItem.classList.add('safe-haven');
        }
        if (index === currentQuestion) {
            prizeItem.classList.add('current');
        }
        
        prizeItem.innerHTML = `
            <span>${prize.level}. ${prize.safeHaven ? '⭐' : ''}</span>
            <span>${formatCurrency(prize.amount)}</span>
        `;
        
        prizesList.appendChild(prizeItem);
    });
}

// ============================================
// GESTIONE DOMANDE
// ============================================

function displayQuestion() {
    if (currentQuestion >= questions.length) {
        endGame(true);
        return;
    }
    
    const question = questions[currentQuestion];
    
    // Aggiorna UI
    document.getElementById('questionNumber').textContent = currentQuestion + 1;
    document.getElementById('questionText').textContent = question.question;
    
    // Mostra le risposte
    const answers = ['A', 'B', 'C', 'D'];
    answers.forEach(letter => {
        const answerBtn = document.querySelector(`[data-answer="${letter}"]`);
        const answerText = document.getElementById(`answer${letter}`);
        answerText.textContent = question.answers[letter];
        
        // Reset dello stato
        answerBtn.classList.remove('selected', 'correct', 'wrong', 'disabled');
        answerBtn.disabled = false;
    });
    
    selectedAnswer = null;
    resetTimer();
}

function selectAnswer(answer) {
    if (selectedAnswer !== null) return; // Già selezionato
    
    selectedAnswer = answer;
    
    // Evidenzia la risposta selezionata
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.querySelector(`[data-answer="${answer}"]`).classList.add('selected');
    
    // Disabilita il timer
    clearInterval(timer);
    
    // Verifica la risposta dopo un breve delay
    setTimeout(() => checkAnswer(), 1000);
}

function checkAnswer() {
    const question = questions[currentQuestion];
    const correct = question.correct;
    
    const selectedBtn = document.querySelector(`[data-answer="${selectedAnswer}"]`);
    const correctBtn = document.querySelector(`[data-answer="${correct}"]`);
    
    if (selectedAnswer === correct) {
        // Risposta corretta
        selectedBtn.classList.remove('selected');
        selectedBtn.classList.add('correct');
        
        score = prizeLadder[currentQuestion].amount;
        
        setTimeout(() => {
            currentQuestion++;
            
            if (currentQuestion >= questions.length) {
                endGame(true);
            } else {
                updateUI();
                displayQuestion();
            }
        }, 2000);
        
    } else {
        // Risposta sbagliata
        selectedBtn.classList.remove('selected');
        selectedBtn.classList.add('wrong');
        correctBtn.classList.add('correct');
        
        setTimeout(() => {
            endGame(false);
        }, 2000);
    }
}

// ============================================
// TIMER
// ============================================

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    updateTimerDisplay();
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            timeOut();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = timeLeft;
    
    if (timeLeft <= 10) {
        timerElement.style.color = '#ff0000';
    } else {
        timerElement.style.color = '#ff6b6b';
    }
}

function timeOut() {
    alert('Tempo scaduto!');
    endGame(false);
}

// ============================================
// AIUTI (LIFELINES)
// ============================================

function useFiftyFifty() {
    if (usedLifelines.fiftyFifty) {
        alert('Hai già usato questo aiuto!');
        return;
    }
    
    usedLifelines.fiftyFifty = true;
    document.getElementById('fiftyFifty').classList.add('used');
    
    const question = questions[currentQuestion];
    const correct = question.correct;
    const answers = ['A', 'B', 'C', 'D'];
    
    // Rimuovi due risposte sbagliate
    const wrongAnswers = answers.filter(a => a !== correct);
    const toRemove = shuffleArray(wrongAnswers).slice(0, 2);
    
    toRemove.forEach(answer => {
        const btn = document.querySelector(`[data-answer="${answer}"]`);
        btn.classList.add('disabled');
        btn.disabled = true;
    });
}

function askAudience() {
    if (usedLifelines.askAudience) {
        alert('Hai già usato questo aiuto!');
        return;
    }
    
    usedLifelines.askAudience = true;
    document.getElementById('askAudience').classList.add('used');
    
    const question = questions[currentQuestion];
    const correct = question.correct;
    
    // Genera percentuali (biased verso la risposta corretta)
    const percentages = generateAudiencePercentages(correct);
    
    // Mostra il modal
    showAudienceChart(percentages);
}

function phoneCall() {
    if (usedLifelines.phoneCall) {
        alert('Hai già usato questo aiuto!');
        return;
    }
    
    usedLifelines.phoneCall = true;
    document.getElementById('phoneCall').classList.add('used');
    
    const question = questions[currentQuestion];
    const correct = question.correct;
    
    // L'amico è abbastanza sicuro (80% di probabilità di dare la risposta giusta)
    const friendAnswer = Math.random() < 0.8 ? correct : ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)];
    const confidence = Math.random() < 0.8 ? 'abbastanza sicuro' : 'non molto sicuro';
    
    const advice = `Il tuo amico è ${confidence} e pensa che la risposta sia ${friendAnswer}.`;
    
    showPhoneAdvice(advice);
}

// ============================================
// MODAL AIUTI
// ============================================

function showAudienceChart(percentages) {
    const modal = document.getElementById('audienceModal');
    const chartContainer = document.getElementById('audienceChart');
    
    chartContainer.innerHTML = '';
    
    Object.entries(percentages).forEach(([answer, percentage]) => {
        const barContainer = document.createElement('div');
        barContainer.className = 'audience-bar-container';
        
        const bar = document.createElement('div');
        bar.className = 'audience-bar';
        bar.style.height = `${percentage * 2}px`;
        bar.textContent = `${percentage}%`;
        
        const letter = document.createElement('div');
        letter.className = 'audience-letter';
        letter.textContent = answer;
        
        barContainer.appendChild(bar);
        barContainer.appendChild(letter);
        chartContainer.appendChild(barContainer);
    });
    
    modal.classList.add('show');
}

function closeAudienceModal() {
    document.getElementById('audienceModal').classList.remove('show');
}

function showPhoneAdvice(advice) {
    const modal = document.getElementById('phoneModal');
    const adviceElement = document.getElementById('phoneAdvice');
    
    adviceElement.innerHTML = `
        <p style="font-size: 1.2rem; line-height: 1.6; padding: 20px;">
            📞 ${advice}
        </p>
    `;
    
    modal.classList.add('show');
}

function closePhoneModal() {
    document.getElementById('phoneModal').classList.remove('show');
}

// ============================================
// AZIONI GIOCO
// ============================================

function retireMoney() {
    if (score === 0) {
        alert('Non hai ancora vinto nulla!');
        return;
    }
    
    if (confirm(`Vuoi ritirarti con ${formatCurrency(score)}?`)) {
        endGame(true, true);
    }
}

function quitGame() {
    if (confirm('Sei sicuro di voler abbandonare? Perderai tutto!')) {
        window.location.href = 'index.html';
    }
}

// ============================================
// FINE GIOCO
// ============================================

function endGame(won, retired = false) {
    clearInterval(timer);
    
    const modal = document.getElementById('gameOverModal');
    const title = document.getElementById('gameOverTitle');
    const message = document.getElementById('gameOverMessage');
    const finalPrize = document.getElementById('finalPrize');
    
    if (won && currentQuestion >= questions.length) {
        // È diventato il Doge!
        title.textContent = '🎉 HAI VINTO! 🎉';
        message.textContent = 'Complimenti! Hai risposto a tutte le domande e vinto il premio massimo!';
        finalPrize.textContent = formatCurrency(1000000);
        score = 1000000;
    } else if (retired) {
        // Si è ritirato
        title.textContent = '💰 Ritiro';
        message.textContent = 'Hai deciso di ritirarti con il premio in denaro. Ottima scelta!';
        finalPrize.textContent = formatCurrency(score);
    } else {
        // Ha perso
        title.textContent = '😢 Game Over';
        const safeHaven = getSafeHavenScore();
        score = safeHaven;
        message.textContent = safeHaven > 0 
            ? 'Peccato! Hai sbagliato, ma porti a casa il premio dell\'ultima soglia di sicurezza.'
            : 'Peccato! Hai sbagliato e non porti a casa nulla.';
        finalPrize.textContent = formatCurrency(score);
    }
    
    // Salva il punteggio
    saveGameScore();
    
    modal.classList.add('show');
}

function getSafeHavenScore() {
    for (let i = currentQuestion - 1; i >= 0; i--) {
        if (prizeLadder[i].safeHaven) {
            return prizeLadder[i].amount;
        }
    }
    return 0;
}

function saveGameScore() {
    let records = JSON.parse(localStorage.getItem('gameRecords')) || [];
    const settings = JSON.parse(localStorage.getItem('gameSettings')) || {};
    
    const newRecord = {
        playerName: settings.playerName || 'Giocatore',
        score: score,
        questionsAnswered: currentQuestion,
        totalQuestions: questions.length,
        date: new Date().toISOString(),
        difficulty: settings.difficulty || 'medium'
    };
    
    records.push(newRecord);
    records.sort((a, b) => b.score - a.score);
    records = records.slice(0, 10);
    
    localStorage.setItem('gameRecords', JSON.stringify(records));
}

function playAgain() {
    window.location.reload();
}

function backToMenu() {
    window.location.href = 'index.html';
}

// ============================================
// AGGIORNAMENTO UI
// ============================================

function updateUI() {
    // Aggiorna premio corrente
    const currentPrize = currentQuestion > 0 ? prizeLadder[currentQuestion - 1].amount : 0;
    document.getElementById('currentPrize').textContent = formatCurrency(currentPrize);
    
    // Aggiorna scala premi
    setupPrizeLadder();
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function generateAudiencePercentages(correctAnswer) {
    const percentages = { A: 0, B: 0, C: 0, D: 0 };
    
    // Genera un bias verso la risposta corretta (60-80%)
    const correctPercentage = 60 + Math.floor(Math.random() * 20);
    percentages[correctAnswer] = correctPercentage;
    
    // Distribuisci il resto
    const remaining = 100 - correctPercentage;
    const answers = ['A', 'B', 'C', 'D'].filter(a => a !== correctAnswer);
    
    let distributed = 0;
    answers.forEach((answer, index) => {
        if (index === answers.length - 1) {
            percentages[answer] = remaining - distributed;
        } else {
            const value = Math.floor(Math.random() * (remaining - distributed));
            percentages[answer] = value;
            distributed += value;
        }
    });
    
    return percentages;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0
    }).format(amount);
}

function getDefaultQuestions() {
    return [
        {
            question: "Qual è la capitale dell'Italia?",
            answers: { A: "Milano", B: "Roma", C: "Napoli", D: "Firenze" },
            correct: "B",
            category: "geografia"
        },
        {
            question: "Chi ha dipinto la Gioconda?",
            answers: { A: "Michelangelo", B: "Raffaello", C: "Leonardo da Vinci", D: "Caravaggio" },
            correct: "C",
            category: "arte"
        },
        {
            question: "In che anno è caduto il Muro di Berlino?",
            answers: { A: "1987", B: "1988", C: "1989", D: "1990" },
            correct: "C",
            category: "storia"
        }
        // Altre domande...
    ];
}
