import * as funzioni from "./utils.js"
import PromptSync from "prompt-sync"
const prompt = PromptSync();

let libri;
libri = [{titolo:"1",autore:"2",genere:"3",isbn:"4"},{titolo:"2",autore:"2",genere:"3",isbn:"4"}];
let utenti = [{user:"porco",pass:"dio", prestiti:[libri[1]],role:0}];
let scelta = null;

do{
    console.log("\n--------------------------------\n1) Login\n2) Registra\n0) Esci\n")
    scelta = prompt("Segli un opzione: ");
    switch(parseInt(scelta)){
        case 1:
            switch(funzioni.login(utenti)){
                case 0:
                    funzioni.userInterface(utenti,libri);
                    break;

                case 1:
                    funzioni.adminInterface(utenti,libri);
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