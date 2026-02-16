<?php
/**
 * ========================================
 * API CLASSIFICA - CHI VUOLE ESSERE IL DOGE?
 * ========================================
 * 
 * Ispirato a cda-game - Sistema semplificato
 * - Solo PHP + JSON (no database!)
 * - Fallback automatico
 * - Zero configurazione
 */

// Headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// File JSON (nella cartella data/ protetta)
$dataDir = __DIR__ . '/../data';
$leaderboardFile = $dataDir . '/leaderboard.json';

// Crea cartella data se non esiste
if (!file_exists($dataDir)) {
    mkdir($dataDir, 0755, true);
}

// Crea file se non esiste
if (!file_exists($leaderboardFile)) {
    file_put_contents($leaderboardFile, '[]');
    chmod($leaderboardFile, 0666);
}

// Funzione per leggere la classifica
function getLeaderboard($file) {
    if (!file_exists($file)) {
        return [];
    }
    
    $json = file_get_contents($file);
    $data = json_decode($json, true);
    
    return $data ? $data : [];
}

// Funzione per salvare la classifica
function saveLeaderboard($file, $data) {
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    return file_put_contents($file, $json);
}

// Gestione delle richieste
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Ottieni la classifica
        $leaderboard = getLeaderboard($leaderboardFile);
        
        // Ordina per punteggio decrescente
        usort($leaderboard, function($a, $b) {
            return $b['score'] - $a['score'];
        });
        
        // Limita ai primi 100
        $leaderboard = array_slice($leaderboard, 0, 100);
        
        // Aggiungi posizione
        foreach ($leaderboard as $index => &$entry) {
            $entry['position'] = $index + 1;
        }
        
        echo json_encode([
            'success' => true,
            'leaderboard' => $leaderboard,
            'total_entries' => count($leaderboard)
        ]);
        break;
        
    case 'POST':
        // Aggiungi un nuovo punteggio
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        
        if (!$data || !isset($data['playerName']) || !isset($data['score'])) {
            echo json_encode([
                'success' => false,
                'error' => 'Dati mancanti: playerName e score sono obbligatori'
            ]);
            exit;
        }
        
        // Validazione
        $playerName = trim(substr($data['playerName'], 0, 50));
        $score = intval($data['score']);
        $questionsAnswered = intval($data['questionsAnswered'] ?? 0);
        $difficulty = in_array($data['difficulty'] ?? '', ['easy', 'medium', 'hard', 'expert']) 
                      ? $data['difficulty'] : 'medium';
        
        if (empty($playerName)) {
            $playerName = 'Anonimo';
        }
        
        // Carica la classifica esistente
        $leaderboard = getLeaderboard($leaderboardFile);
        
        // Aggiungi il nuovo punteggio
        $newEntry = [
            'playerName' => $playerName,
            'score' => $score,
            'questionsAnswered' => $questionsAnswered,
            'difficulty' => $difficulty,
            'date' => date('c'),
            'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
        ];
        
        $leaderboard[] = $newEntry;
        
        // Ordina per punteggio
        usort($leaderboard, function($a, $b) {
            return $b['score'] - $a['score'];
        });
        
        // Mantieni solo i primi 100
        $leaderboard = array_slice($leaderboard, 0, 100);
        
        // Salva
        if (saveLeaderboard($leaderboardFile, $leaderboard)) {
            // Trova la posizione del giocatore
            $position = 0;
            foreach ($leaderboard as $index => $entry) {
                if ($entry['playerName'] === $playerName && 
                    $entry['score'] === $score && 
                    $entry['date'] === $newEntry['date']) {
                    $position = $index + 1;
                    break;
                }
            }
            
            echo json_encode([
                'success' => true,
                'message' => 'Punteggio salvato con successo',
                'position' => $position,
                'total_players' => count($leaderboard)
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'Errore nel salvare il punteggio'
            ]);
        }
        break;
        
    case 'DELETE':
        // Cancella tutta la classifica (solo per admin)
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        
        // Password di admin (CAMBIALA!)
        $adminPassword = 'caffe2024angolo';
        
        if (!isset($data['password']) || $data['password'] !== $adminPassword) {
            echo json_encode([
                'success' => false,
                'error' => 'Password admin non corretta'
            ]);
            exit;
        }
        
        if (saveLeaderboard($leaderboardFile, [])) {
            echo json_encode([
                'success' => true,
                'message' => 'Classifica cancellata con successo'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'Errore nella cancellazione'
            ]);
        }
        break;
        
    default:
        echo json_encode([
            'success' => false,
            'error' => 'Metodo non supportato'
        ]);
        break;
}
?>
