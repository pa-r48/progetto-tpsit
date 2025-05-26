//TODO creare schermata di azioni per il tipo di user
import PromptSync from "prompt-sync"
const prompt = PromptSync();

export const login = (utenti, user, pass) =>{
    console.log("\n---------------------------------");
    switch(checkCred(user, pass, utenti)){
        case -1:
            console.log("ERRORE, controllare username e/o password");
            break;
        
        case 0:
            return 0;

        case 1:
            return 1;
    }
}


export const registra = (utenti) =>{
    let user;
    let pass;

    while(true){
        console.log("\n---------------------------------");
        user = prompt("Username: ");
        pass = prompt("Password: ");
        
        if(utenti.filter(i => i.user === user).length === 0){
            utenti.push({user:user, pass:pass, role:0});
            break;
        }
        else{
            console.log("---------------------------------\nERRORE, username già in uso");
        }
    }
}



export const userInterface = (utenti,libri,user) =>{
    let scelta = null;
    
    do{
        console.log("\n--------------------------------\n1) Visualizza catalogo\n2) Ricerca libro\n3) Gestione prestiti\n0) Esci\n")
        scelta = prompt("Segli un opzione: ");
        switch(parseInt(scelta)){
            case 1:
                viewCatalogue(libri);
                scelta = null;
                break;
            
            case 2:
                search(libri);
                scelta = null;
                break;

            case 3:
                userPrestiti(utenti,libri,user);
                scelta = null;
                break;
    
            case 0:
                break;
    
            default:
                console.log("\nERRORE, inserisci un opzione valida")
                break;
        }
    }while(scelta != 0);
}


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
                utenti.map(u =>{console.log(`Username: ${u.user} | Ruolo: ${u.role === 0 ? "Utente" : "Admin"}`)});
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



//TODO isbn 13 numeri
const viewCatalogue = (libri) =>{
    console.log("\n--------------------------------\n\nTitolo\t|Autore\t|Genere\t|ISBN");

    libri.map(i =>{console.log(`\n${i.titolo}\t|${i.autore}\t|${i.genere}\t|${i.isbn}`)});
}


const search = (libri) =>{
    let scelta = null;
    let key = null;
    let x = null;

    do{
        console.log("\n--------------------------------\n\nRicerca per:\n1) Titolo\n2) Autore\n3) Genere\n4) ISBN\n0) Esci\n");
        scelta = prompt("Segli un opzione: ");
        switch(parseInt(scelta)){
            case 1:
                key = prompt("Titolo: ");
                x =libri.map(i =>{ 
                    if(i.titolo === key){
                        console.log(`\n${i.titolo}\t|${i.autore}\t|${i.genere}\t|${i.isbn}`);
                }});
                break;

            case 2:
                key = prompt("Autore: ");
                x =libri.map(i =>{ 
                    if(i.autore === key){
                        console.log(`\n${i.titolo}\t|${i.autore}\t|${i.genere}\t|${i.isbn}`);
                }});
                break;

            case 3:
                key = prompt("Genere: ");
                x =libri.map(i =>{ 
                    if(i.genere === key){
                        console.log(`\n${i.titolo}\t|${i.autore}\t|${i.genere}\t|${i.isbn}`);
                }});
                break;

            case 4:
                key = prompt("ISBN: ");
                x =libri.map(i =>{ 
                    if(i.isbn === key){
                        console.log(`\n${i.titolo}\t|${i.autore}\t|${i.genere}\t|${i.isbn}`);
                }});
            break;

            case 0:
                break;

            default:
                console.log("\nERRORE, inserisci un opzione valida")
            break;
        }

    }while(scelta != 0);
}


const userPrestiti = (utenti, libri, user) => {
    let scelta = null;

    do {
        console.log("\n--------------------------------\n\n1) Richiedi libro\n2) Restituisci libro\n0) Esci\n");
        scelta = prompt("Scegli un'opzione: ");
        switch (parseInt(scelta)) {
            case 1:
                console.log("\n--------------------------------\n");
                const titolo = prompt("Inserisci il titolo: ");
                const libro = libri.find(i => i.titolo === titolo);

                if(libro){
                    var userCorr = utenti.find(i => i.user === user);

                    if(!userCorr.prestiti.some(l => l.titolo === libro.titolo)){
                        userCorr.prestiti.push(libro);
                        console.log("Libro preso in prestito");
                    } 
                    else{
                        console.log("Hai già questo libro in prestito");
                    }
                }
                else{
                    console.log("ERRORE, libro non trovato");
                }
                break;

            case 2:
                console.log("\n--------------------------------\n");
                const titoloRestituzione = prompt("Inserisci il titolo del libro da restituire: ");
                var userCorr = utenti.find(i => i.user === user);

                const indexLibro = userCorr.prestiti.findIndex(l => l.titolo === titoloRestituzione);

                if(indexLibro !== -1){
                    userCorr.prestiti.splice(indexLibro, 1);
                    console.log("Libro restituito correttamente");
                } 
                else{
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



const checkCred = (user, pass, utenti) =>{
    let x = []
    x = utenti.filter(i => i.user === user && i.pass === pass);
    if(x.length==1){
        return x[0].role; //role 0 user role 1 admin
    }
    else{
        return -1;
    }
}