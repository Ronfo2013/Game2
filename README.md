# 🦁 CHI VUOLE ESSERE IL DOGE? 🦁
## Caffè dell'Angolo - Portogruaro Edition v2.0

![Logo Caffè dell'Angolo](logo.png)

Quiz sulla storia di Portogruaro dal 1140 ai giorni nostri!

---

## ✨ VERSIONE 2.0 - ZERO CONFIG

### 🎯 Novità

* **Zero configurazione** - Funziona appena caricato
* **Nessun database** - Solo PHP + JSON
* **Classifica condivisa** tra tutti i giocatori
* **Fallback automatico** se API non raggiungibile
* **200 domande** sulla storia di Portogruaro
* **Config centralizzato** in `config.js`

---

## 📋 Requisiti

* Hosting con PHP (IONOS, Aruba, ecc.)
* **NO database necessario**
* PHP 7.4+
* Spazio: ~3 MB

---

## 🚀 Installazione (5 minuti)

### 1. Scarica

Estrai il file ZIP

### 2. Carica su Hosting

Via FTP o File Manager, carica TUTTO:

```
/tuosito.com/
├── index.html
├── game.html
├── help.html
├── records.html
├── logo.png
├── config.js
├── main.js
├── controllers.js
├── style.css
├── questions.json
├── api_leaderboard.php
└── data/
    ├── .htaccess
    └── leaderboard.json
```

### 3. Verifica Permessi (solo se necessario)

```bash
# Cartella data
chmod 755 data/

# File classifica
chmod 666 data/leaderboard.json
```

Su IONOS solitamente funziona senza modifiche.

### 4. Apri

`https://tuosito.com/index.html`

### 5. Fine! 🎉

---

## 🎮 Come Funziona

### Cambiare il Logo

Sostituisci il file `logo.png` con il tuo logo (max 300px larghezza consigliata)

### Modificare i Colori

Nel file `style.css`, cerca e modifica:

```css
/* Colori tema veneziano */
background: rgba(139, 0, 0, 0.1);  /* Rosso veneziano */
color: #ffd700;  /* Oro */
```

### Aggiungere Domande

Modifica `questions.json`:

```json
{
  "question": "La tua domanda?",
  "answers": {
    "A": "Risposta A",
    "B": "Risposta B",
    "C": "Risposta C",
    "D": "Risposta D"
  },
  "correct": "B",
  "category": "storia",
  "difficulty": "medium",
  "epoch": "Venezia"
}
```

**Categorie disponibili:**
- medioevo, venezia, austria, italia
- personaggi, monumenti, cultura
- geografia, enogastronomia, tradizioni
- E molte altre...

**Difficoltà:**
- `easy` - Facile
- `medium` - Medio
- `hard` - Difficile
- `expert` - Esperto

---

## 🏆 Sistema Classifica Condivisa

### Come Funziona

La classifica è **globale e condivisa** tra tutti i giocatori tramite:
- File PHP (`api_leaderboard.php`)
- Database JSON (`leaderboard.json`)

### Gestione Admin

Per resettare la classifica:

```javascript
// Console browser (F12)
fetch('api_leaderboard.php', {
  method: 'DELETE',
  body: JSON.stringify({password: 'caffe2024angolo'})
})
```

**⚠️ IMPORTANTE:** Cambia la password admin in `api_leaderboard.php` (riga 89):
```php
$adminPassword = 'TUA_PASSWORD_SICURA';
```

### Permessi File

Il file `leaderboard.json` deve essere scrivibile:
```bash
chmod 666 leaderboard.json
```

---

## 🎯 Idee di Utilizzo

### Per il Caffè dell'Angolo

1. **Quiz serale** - Gara tra clienti con premi
2. **Social media** - Post Instagram/Facebook con link
3. **Eventi speciali** - Serate a tema storia di Portogruaro
4. **Loyalty program** - Punti extra per punteggi alti

### Per Eventi Locali

1. **Feste patronali** - Quiz pubblico
2. **Scuole** - Educazione storia locale
3. **Turismo** - Attrazione per visitatori
4. **Pro Loco** - Promozione territorio

### Per Formazione

1. **Onboarding** dipendenti locali
2. **Guide turistiche** - Test preparazione
3. **Studenti** - Esame storia locale

---

## 🔧 Risoluzione Problemi

### Classifica non si salva

1. Verifica permessi `leaderboard.json`
2. Controlla che PHP sia installato
3. Verifica errori nella console browser (F12)

### Domande non si caricano

1. Verifica che `questions.json` sia presente
2. Controlla validità JSON su jsonlint.com
3. Verifica path nel file `controllers.js`

### Immagini non appaiono

1. Verifica che `logo.png` sia nella stessa cartella
2. Controlla permessi file
3. Svuota cache browser (Ctrl+F5)

---

## 📊 Statistiche Database

- **Totale domande:** 200
- **Difficoltà Easy:** 33
- **Difficoltà Medium:** 90
- **Difficoltà Hard:** 53
- **Difficoltà Expert:** 24

**Top 5 Categorie:**
1. Cultura - 26 domande
2. Monumenti - 23 domande
3. Personaggi - 22 domande
4. Geografia - 13 domande
5. Medioevo - 11 domande

---

## 🎓 Fonti Storiche

Le domande sono basate su:
- Wikipedia (Portogruaro, Luigi Russolo, Lorenzo Da Ponte)
- Comune di Portogruaro - Sito ufficiale
- Portogruaro Eventi
- Fondazione di Venezia
- Archivi storici regionali

---

## 📝 Licenza

GPL-3.0 License

Il gioco è liberamente modificabile e distribuibile.

---

## 💡 Supporto e Contatti

**Creato per:** Caffè dell'Angolo - Portogruaro  
**Basato su:** La storia millenaria della città  
**Logo:** Caffè dell'Angolo  

---

## 🌟 Credits

- **Concept:** Quiz show "Chi vuol essere milionario?"
- **Tema:** La Serenissima Repubblica di Venezia
- **Contenuti:** Storia di Portogruaro
- **Grafica:** Ispirazione veneziana

---

**Buon divertimento e buona fortuna per diventare Il Doge! 🦁🍷**
