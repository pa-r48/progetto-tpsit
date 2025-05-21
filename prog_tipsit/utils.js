//TODO creare schermata di azioni per il tipo di user
import PromptSync from "prompt-sync"
const prompt = PromptSync();

export const login = (utenti) =>{
    let user;
    let pass;

    console.log("\n---------------------------------");
    user = prompt("Username: ");
    pass = prompt("Password: ");
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



export const userInterface = (utenti,libri) =>{
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
                userPrestiti(utenti,libri);
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


export const adminInterface = () =>{

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

            case 2:
                key = prompt("Autore: ");
                x =libri.map(i =>{ 
                    if(i.autore === key){
                        console.log(`\n${i.titolo}\t|${i.autore}\t|${i.genere}\t|${i.isbn}`);
                }});

            case 3:
                key = prompt("Genere: ");
                x =libri.map(i =>{ 
                    if(i.genere === key){
                        console.log(`\n${i.titolo}\t|${i.autore}\t|${i.genere}\t|${i.isbn}`);
                }});

            case 4:
                key = prompt("ISBN: ");
                x =libri.map(i =>{ 
                    if(i.isbn === key){
                        console.log(`\n${i.titolo}\t|${i.autore}\t|${i.genere}\t|${i.isbn}`);
                }});
            break;
        }

    }while(scelta != 0);
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