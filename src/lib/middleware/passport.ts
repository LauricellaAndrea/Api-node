import { profile } from "console";
import passport from "passport"
import passportGithub2 from "passport-github2"

const githubStrategy = new passportGithub2.Strategy(
    {
        clientID: "",
        clientSecret: "",
        callbackURL: "",
    },
    function(
        accessToken: string,
        refreshToken: string,
        profile: { [key: string]: string; },
        done: (error: null, user: Express.User) => void
    ) {
        const user: Express.User = {
            username: profile.username,
        };

        done(null, user)
    }
);