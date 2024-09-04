const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const Usuario = require('./models/user.schema'); 

// Configuração da estratégia Local
passport.use(new LocalStrategy(
    { usernameField: 'email' }, // O campo para login é o e-mail
    async (email, password, done) => {
        try {
            const user = await Usuario.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }

            // A senha agora é verificada pelo passport-local-mongoose
            user.authenticate(password, (err, user, info) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: info.message });
                }
                return done(null, user);
            });
        } catch (err) {
            return done(err);
        }
    }
));

// Serializar e desserializar o usuário
passport.serializeUser((user, done) => {
    done(null, user.id); // Usando o ID do usuário
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Usuario.findById(id);
        done(null, user);
    } catch (err) {
        done(err, false);
    }
});
