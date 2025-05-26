/**
 @author Pasquale Radatti 4Bi ITIS luigi di maggio
 */

import * as funzioni from "./utils.js"
import PromptSync from "prompt-sync"
const prompt = PromptSync();

/**
 * array dei i libri
 * @type {Array<{titolo: string, autore: string, genere: string, isbn: string}>}
 */
let libri = [
    { titolo: "Il signore degli anelli", autore: "JRR Tolkien", genere: "fantasy", isbn: "4848484848484" },
    { titolo: "How to build an f1 car", autore: "Adrian Newey", genere: "biografia", isbn: "8484848484848" }
];

/**
 * array con gli utenti registrati
 * Ogni utente ha username, password, ruolo e lista prestiti.
 * @type {Array<{user: string, pass: string, role: number, prestiti: Array}>}
 */
let utenti = [
    { user: "user", pass: "123", prestiti: [libri[1]], role: 0 },
    { user: "admin", pass: "123", prestiti: [], role: 0 }
];

let scelta = null;
let user;
let pass;

do {
    console.log("\n--------------------------------\n1) Login\n2) Registra\n0) Esci\n");
    scelta = prompt("Segli un opzione: ");

    switch (parseInt(scelta)) {
        case 1:
            user = prompt("Username: ");
            pass = prompt("Password: ");
            /**
             * login utente con indicazione sulla rispettiva interfaccia
             */
            switch (funzioni.login(utenti, user, pass)) {
                case 0:
                    funzioni.userInterface(utenti, libri, user);
                    break;

                case 1:
                    funzioni.adminInterface(utenti, libri, user);
                    break;

                default:
                    break;
            }
            scelta = null;
            break;

        case 2:
            /**
             * registra un nuovo utente
             */
            funzioni.registra(utenti);
            scelta = null;
            break;

        case 0:
            break;

        default:
            console.log("\nERRORE, inserisci un opzione valida");
            break;
    }
} while (scelta != 0);
