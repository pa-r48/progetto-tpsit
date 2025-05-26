import PromptSync from "prompt-sync"
const prompt = PromptSync();

/**
 * gestisce il login di un utente controllando username e password
 * @param {Array} utenti - array degli utenti registrati
 * @param {string} user - username inserito
 * @param {string} pass - password inserita
 * @returns {number|undefined} - restituisce 0 se utente, 1 se admin, -1 se credenziali errate
 */
export const login = (utenti, user, pass) => {
    console.log("\n---------------------------------");
    switch (checkCred(user, pass, utenti)) {
        case -1:
            console.log("ERRORE, controllare username e/o password");
            break;
        case 0:
            return 0;
        case 1:
            return 1;
    }
}

/**
 * registra un nuovo utente chiedendo username e password, verificando che non sia già presente
 * @param {Array} utenti - array degli utenti esistenti
 */
export const registra = (utenti) => {
    let user;
    let pass;

    while (true) {
        console.log("\n---------------------------------");
        user = prompt("Username: ");
        pass = prompt("Password: ");

        if (utenti.filter(i => i.user === user).length === 0) {
            utenti.push({ user: user, pass: pass, role: 0 });
            break;
        } else {
            console.log("---------------------------------\nERRORE, username già in uso");
        }
    }
}

/**
 * interfaccia utente. Permette di visualizzare il catalogo, cercare libri e gestire prestiti
 * @param {Array} utenti - array degli utenti
 * @param {Array} libri - catalogo dei libri
 * @param {string} user - username corrente
 */
export const userInterface = (utenti, libri, user) => {
    let scelta = null;

    do {
        console.log("\n--------------------------------\n1) Visualizza catalogo\n2) Ricerca libro\n3) Gestione prestiti\n0) Esci\n")
        scelta = prompt("Segli un opzione: ");
        switch (parseInt(scelta)) {
            case 1:
                viewCatalogue(libri);
                scelta = null;
                break;
            case 2:
                search(libri);
                scelta = null;
                break;
            case 3:
                userPrestiti(utenti, libri, user);
                scelta = null;
                break;
            case 0:
                break;
            default:
                console.log("\nERRORE, inserisci un opzione valida")
                break;
        }
    } while (scelta != 0);
}

/**
 * interfaccia amministratore con funzionalità di gestione utenti e catalogo
 * @param {Array} utenti - array degli utenti
 * @param {Array} libri - catalogo dei libri
 * @param {string} user - username corrente
 */
export const adminInterface = (utenti, libri, user) => {
    let scelta = null;

    do {
        console.log("\n--------------------------------\n\n1) Visualizza catalogo\n2) Aggiungi libro\n3) Rimuovi libro\n4) Visualizza utenti\n5) Prestiti utente\n6) Crea nuovo utente\n0) Esci");
        scelta = prompt("Scegli un'opzione: ");

        switch (parseInt(scelta)) {
            case 1:
                viewCatalogue(libri);
                scelta = null;
                break;

            case 2:
                const titolo = prompt("Titolo: ");
                const autore = prompt("Autore: ");
                const genere = prompt("Genere: ");
                const isbn = prompt("ISBN (13 cifre): ");
                if (isbn.length === 13 && !libri.some(l => l.isbn === isbn)) {
                    libri.push({ titolo, autore, genere, isbn });
                    console.log("Libro aggiunto con successo.");
                } else {
                    console.log("ERRORE: ISBN già esistente o non valido.");
                }
                scelta = null;
                break;

            case 3:
                const isbnRem = prompt("Inserisci ISBN del libro da rimuovere: ");
                const index = libri.findIndex(l => l.isbn === isbnRem);
                if (index !== -1) {
                    libri.splice(index, 1);
                    console.log("Libro rimosso con successo.");
                } else {
                    console.log("Libro non trovato.");
                }
                scelta = null;
                break;

            case 4:
                utenti.map(u => {
                    console.log(`Username: ${u.user} | Ruolo: ${u.role === 0 ? "Utente" : "Admin"}`)
                });
                scelta = null;
                break;

            case 5:
                const utenteRichiesto = prompt("Inserisci username dell'utente: ");
                const utente = utenti.find(u => u.user === utenteRichiesto);
                if (utente) {
                    console.log(`\nPrestiti di ${utente.user}:`);
                    if (utente.prestiti && utente.prestiti.length > 0) {
                        utente.prestiti.forEach(l => {
                            console.log(`${l.titolo} | ${l.autore} | ${l.genere} | ${l.isbn}`);
                        });
                    } else {
                        console.log("Nessun libro in prestito.");
                    }
                } else {
                    console.log("Utente non trovato.");
                }
                scelta = null;
                break;

            case 6:
                const nuovoUser = prompt("Nuovo username: ");
                const nuovaPass = prompt("Password: ");
                const ruolo = prompt("Ruolo (0 = Utente, 1 = Admin): ");
                if (!utenti.some(u => u.user === nuovoUser) && (ruolo === "0" || ruolo === "1")) {
                    utenti.push({ user: nuovoUser, pass: nuovaPass, role: parseInt(ruolo), prestiti: [] });
                    console.log("Utente creato con successo.");
                } else {
                    console.log("ERRORE: Username già esistente o ruolo non valido.");
                }
                scelta = null;
                break;

            case 0:
                break;

            default:
                console.log("ERRORE, inserisci un'opzione valida.");
                break;
        }

    } while (scelta != 0);
}

/**
 * mostra l'intero catalogo dei libri disponibili
 * @param {Array} libri - elenco dei libri
 */
const viewCatalogue = (libri) => {
    console.log("\n--------------------------------\n\nTitolo\t|Autore\t|Genere\t|ISBN");
    libri.map(i => {
        console.log(`\n${i.titolo}\t|${i.autore}\t|${i.genere}\t|${i.isbn}`);
    });
}

/**
 * permette di cercare libri per vari parametri
 * @param {Array} libri - Elenco dei libri
 */
const search = (libri) => {
    let scelta = null;
    let key = null;

    do {
        console.log("\n--------------------------------\n\nRicerca per:\n1) Titolo\n2) Autore\n3) Genere\n4) ISBN\n0) Esci\n");
        scelta = prompt("Segli un opzione: ");

        switch (parseInt(scelta)) {
            case 1:
                key = prompt("Titolo: ");
                break;
            case 2:
                key = prompt("Autore: ");
                break;
            case 3:
                key = prompt("Genere: ");
                break;
            case 4:
                key = prompt("ISBN: ");
                break;
            case 0:
                return;
            default:
                console.log("\nERRORE, inserisci un opzione valida");
                continue;
        }

        libri.forEach(i => {
            if (i.titolo === key || i.autore === key || i.genere === key || i.isbn === key) {
                console.log(`\n${i.titolo}\t|${i.autore}\t|${i.genere}\t|${i.isbn}`);
            }
        });

    } while (scelta != 0);
}

/**
 * restisce i prestiti di un utente: richiedere o restituire libri
 * @param {Array} utenti - elenco utenti
 * @param {Array} libri - catalogo libri
 * @param {string} user - username corrente
 */
const userPrestiti = (utenti, libri, user) => {
    let scelta = null;

    do {
        console.log("\n--------------------------------\n\n1) Richiedi libro\n2) Restituisci libro\n0) Esci\n");
        scelta = prompt("Scegli un'opzione: ");

        switch (parseInt(scelta)) {
            case 1:
                const titolo = prompt("Inserisci il titolo: ");
                const libro = libri.find(i => i.titolo === titolo);
                const userCorr = utenti.find(i => i.user === user);

                if (libro) {
                    if (!userCorr.prestiti.some(l => l.titolo === libro.titolo)) {
                        userCorr.prestiti.push(libro);
                        console.log("Libro preso in prestito");
                    } else {
                        console.log("Hai già questo libro in prestito");
                    }
                } else {
                    console.log("ERRORE, libro non trovato");
                }
                break;

            case 2:
                const titoloRestituzione = prompt("Inserisci il titolo del libro da restituire: ");
                const indexLibro = userCorr.prestiti.findIndex(l => l.titolo === titoloRestituzione);

                if (indexLibro !== -1) {
                    userCorr.prestiti.splice(indexLibro, 1);
                    console.log("Libro restituito correttamente");
                } else {
                    console.log("Non hai questo libro in prestito");
                }
                break;

            case 0:
                break;

            default:
                console.log("\nERRORE, inserisci un'opzione valida");
                break;
        }

    } while (scelta != 0);
}

/**
 * verifica le credenziali dell'utente
 * @param {string} user - username inserito
 * @param {string} pass - password inserita
 * @param {Array} utenti - lista degli utenti
 * @returns {number} - 0 se utente, 1 se admin, -1 se errore
 */
const checkCred = (user, pass, utenti) => {
    const x = utenti.filter(i => i.user === user && i.pass === pass);
    if (x.length === 1) {
        return x[0].role; // 0 = utente, 1 = admin
    } else {
        return -1;
    }
}
