/**
 * ========================================
 * CONFIGURAZIONE - CHI VUOLE ESSERE IL DOGE?
 * ========================================
 * 
 * Ispirato a cda-game di Ronfo2013
 * Configurazione centralizzata zero-config
 */

const CONFIG = {
  
  // ========================================
  // BRAND & INFO
  // ========================================
  BRAND: {
    name: "Caffè dell'Angolo",
    gameName: "CHI VUOLE ESSERE IL DOGE?",
    subtitle: "Portogruaro Edition",
    tagline: "🦁 La Storia di Portogruaro in un Quiz 🦁",
    footer: "Una produzione Caffè dell'Angolo - Portogruaro",
    
    logo: {
      enabled: true,
      path: "logo.png",
      alt: "Caffè dell'Angolo",
      maxWidth: "300px"
    },
    
    // Per eventi
    event: {
      date: "Sabato 14 Marzo 2026",
      location: "Caffè dell'Angolo - Portogruaro"
    }
  },

  // ========================================
  // GIOCO
  // ========================================
  GAME: {
    // Domande
    totalQuestions: 15,
    questionsFile: "questions.json",
    shuffleQuestions: true,
    
    // Timer
    enableTimer: true,
    timePerQuestion: 30, // secondi
    
    // Audio
    enableSound: true,
    
    // Difficoltà disponibili
    difficulties: [
      { id: "easy", label: "Facile - Per principianti" },
      { id: "medium", label: "Medio - Conoscenza base" },
      { id: "hard", label: "Difficile - Esperti di storia" },
      { id: "expert", label: "Esperto - Vero Portogruarese" }
    ],
    defaultDifficulty: "medium",
    
    // Categorie
    categories: [
      { id: "all", label: "Tutte le epoche" },
      { id: "medioevo", label: "Medioevo (1140-1420)" },
      { id: "venezia", label: "Periodo Veneziano (1420-1797)" },
      { id: "austria", label: "Periodo Austriaco (1797-1866)" },
      { id: "italia", label: "Regno d'Italia (1866-oggi)" },
      { id: "personaggi", label: "Personaggi illustri" },
      { id: "monumenti", label: "Monumenti e luoghi" },
      { id: "cultura", label: "Arte e cultura" }
    ]
  },

  // ========================================
  // SCALA PREMI
  // ========================================
  PRIZES: [
    { level: 1,  amount: 100,     safeHaven: false },
    { level: 2,  amount: 200,     safeHaven: false },
    { level: 3,  amount: 300,     safeHaven: false },
    { level: 4,  amount: 500,     safeHaven: false },
    { level: 5,  amount: 1000,    safeHaven: true  },  // ⭐ Safe
    { level: 6,  amount: 2000,    safeHaven: false },
    { level: 7,  amount: 4000,    safeHaven: false },
    { level: 8,  amount: 8000,    safeHaven: false },
    { level: 9,  amount: 16000,   safeHaven: false },
    { level: 10, amount: 32000,   safeHaven: true  },  // ⭐ Safe
    { level: 11, amount: 64000,   safeHaven: false },
    { level: 12, amount: 125000,  safeHaven: false },
    { level: 13, amount: 250000,  safeHaven: false },
    { level: 14, amount: 500000,  safeHaven: false },
    { level: 15, amount: 1000000, safeHaven: false }
  ],

  // ========================================
  // AIUTI (LIFELINES)
  // ========================================
  LIFELINES: {
    fiftyFifty: {
      enabled: true,
      name: "50:50",
      icon: "⚖️",
      description: "Elimina due risposte sbagliate"
    },
    
    askAudience: {
      enabled: true,
      name: "Aiuto del Pubblico",
      icon: "👥",
      description: "Il pubblico vota",
      accuracy: 0.75  // Probabilità risposta corretta
    },
    
    phoneCall: {
      enabled: true,
      name: "Telefonata",
      icon: "📞",
      description: "Chiama un amico",
      accuracy: 0.80,
      duration: 30  // secondi
    }
  },

  // ========================================
  // CLASSIFICA CONDIVISA
  // Come cda-game: API PHP + JSON, no database!
  // ========================================
  LEADERBOARD: {
    // Usa API per classifica condivisa
    useAPI: true,
    apiEndpoint: "api_leaderboard.php",
    
    // Fallback su localStorage se API non raggiungibile
    fallbackToLocal: true,
    localStorageKey: "il_doge_leaderboard",
    
    // Configurazione
    maxEntries: 100,
    showStats: true,
    allowReset: false,
    adminPassword: "caffe2024angolo",  // CAMBIALA!
    
    // Campi da salvare
    saveFields: [
      "playerName",
      "score",
      "questionsAnswered",
      "difficulty",
      "category",
      "date"
    ]
  },

  // ========================================
  // TEMA VENEZIANO
  // ========================================
  THEME: {
    colors: {
      primary: "#8B0000",      // Rosso veneziano
      secondary: "#DAA520",    // Oro
      accent: "#FFD700",       // Oro brillante
      background: "#1e3c72",   // Blu scuro
      text: "#FFFFFF",
      success: "#27ae60",
      error: "#c0392b",
      warning: "#f39c12"
    },
    
    // Pattern veneziano di sfondo
    backgroundPattern: true,
    
    // Animazioni
    animations: {
      enabled: true,
      duration: 300,  // ms
      easing: "ease-in-out"
    }
  },

  // ========================================
  // MESSAGGI
  // ========================================
  MESSAGES: {
    welcome: {
      title: "Benvenuto al Gioco del Doge!",
      text: "Metti alla prova la tua conoscenza sulla storia di Portogruaro"
    },
    
    gameplay: {
      correct: "🎉 Esatto! Risposta corretta!",
      wrong: "😢 Risposta sbagliata!",
      timeout: "⏰ Tempo scaduto!",
      lifelineUsed: "Hai usato un aiuto!"
    },
    
    endGame: {
      won: {
        title: "🎉 SEI DIVENTATO IL DOGE! 🎉",
        text: "Complimenti! Sei un vero esperto di Portogruaro!"
      },
      retired: {
        title: "💰 Hai scelto di ritirarti",
        text: "Ottima decisione! Hai vinto:"
      },
      lost: {
        title: "😢 Game Over",
        text: "Peccato! Ma hai imparato qualcosa di nuovo!"
      }
    }
  },

  // ========================================
  // ACCESSIBILITÀ
  // ========================================
  ACCESSIBILITY: {
    keyboardSupport: true,
    keyBindings: {
      answerA: "a",
      answerB: "b",
      answerC: "c",
      answerD: "d",
      lifeline1: "1",
      lifeline2: "2",
      lifeline3: "3",
      confirm: "Enter",
      pause: "Escape"
    }
  },

  // ========================================
  // DEBUG (sviluppo)
  // ========================================
  DEBUG: {
    enabled: false,        // Attiva in sviluppo
    logging: false,        // Console log
    skipIntro: false,      // Salta intro
    godMode: false,        // Sempre risposta corretta
    infiniteTime: false    // Timer infinito
  }
};

// ========================================
// FUNZIONI UTILITY
// ========================================

/**
 * Ottieni configurazione
 * @param {string} path - es: "GAME.totalQuestions"
 */
function getConfig(path) {
  return path.split('.').reduce((obj, key) => obj?.[key], CONFIG);
}

/**
 * Formatta valuta
 * @param {number} amount
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  }).format(amount);
}

/**
 * Applica tema CSS
 */
function applyTheme() {
  const root = document.documentElement;
  const colors = CONFIG.THEME.colors;
  
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
}

// Applica tema all'avvio
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyTheme);
} else {
  applyTheme();
}

// Export per uso in altri file
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
