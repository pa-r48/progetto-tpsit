import * as funzioni from "./utils.js"
import PromptSync from "prompt-sync"
const prompt = PromptSync();

let libri;
libri = [];
let utenti = [{user:"porco",pass:"dio",role:1}];
let scelta = null;

do{
    console.log("\n--------------------------------\n1) Login\n2) Registra\n0) Esci\n")
    scelta = prompt("Segli un opzione: ");
    switch(parseInt(scelta)){
        case 1:
            funzioni.login(utenti);
            break;
        
        case 2:
            funzioni.registra(utenti);
            break;

        case 0:
            break;

        default:
            console.log("\nERRORE, inserisci un opzione valida")
            break;
    }
}while(scelta != 0);