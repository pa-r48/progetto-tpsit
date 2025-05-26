import * as funzioni from "./utils.js"
import PromptSync from "prompt-sync"
const prompt = PromptSync();

let libri;
libri = [{titolo:"1",autore:"2",genere:"3",isbn:"4"},{titolo:"2",autore:"2",genere:"3",isbn:"4"}];
let utenti = [{user:"user",pass:"123", prestiti:[libri[1]],role:0}, {user:"admin",pass:"123", prestiti:[libri[1]],role:0}];
let scelta = null;
let user;
let pass;

do{
    console.log("\n--------------------------------\n1) Login\n2) Registra\n0) Esci\n")
    scelta = prompt("Segli un opzione: ");
    switch(parseInt(scelta)){
        case 1:
            user = prompt("Username: ");
            pass = prompt("Password: ");
            switch(funzioni.login(utenti, user, pass)){
                case 0:
                    funzioni.userInterface(utenti,libri,user);
                    break;

                case 1:
                    funzioni.adminInterface(utenti,libri,user);
                    break;

                default:
                    break;
            }
            scelta = null;
            break;
        
        case 2:
            funzioni.registra(utenti);
            scelta = null;
            break;

        case 0:
            break;

        default:
            console.log("\nERRORE, inserisci un opzione valida")
            break;
    }
}while(scelta != 0);