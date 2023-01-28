//session ci consente di archiviare temporaneamente i dati per un utente specifico

import session from "express-session";
import config from "../../config";

export function initSessionMiddleware() {
    return session({
        secret: config.SESSION_SECRET, //servirà per crittografare i cookie di sessione
        resave: false,
        saveUninitialized: false,
    });
}



/**
 * per ottenere la chiave segreta basterà sul terminale
 * inserire questo (node -e "console.log(crypto.randomBytes(32).toString('hex'))" )
 */
