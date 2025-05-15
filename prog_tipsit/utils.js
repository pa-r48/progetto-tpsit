//TODO creare schermata di azioni per il tipo di user
import PromptSync from "prompt-sync"
const prompt = PromptSync();

export const login = (utenti) =>{
    let user;
    let pass;

    console.log("---------------------------------");
    user = prompt("Username: ");
    pass = prompt("Password: ");
    switch(checkCred(user, pass, utenti)){
        case -1:
            console.log("ERRORE, controllare username e/o password");
            break;
        
        case 0:
            user();
            break;

        case 1:
            admin();
            break;
    }
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


export const registra = (utenti) =>{
    console.log("---------------------------------");
    user = prompt("Username: ");
    pass = prompt("Password: ");

    
}