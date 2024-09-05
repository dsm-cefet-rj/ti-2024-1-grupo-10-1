const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();
const User = require('./models/user.schema');
const jwt = require('jsonwebtoken');

// Configuração da estratégia Local
passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'senha' }, // Configura o campo de senha como 'senha'
    async (email, senha, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            user.authenticate(senha, (err, user, info) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: info.message });
                }
                // Não chamamos req.login para evitar o uso de sessões
                return done(null, user);
            });
        } catch (err) {
            return done(err);
        }
    }
));

// Configuração da estratégia JWT
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));

exports.verifyUser = passport.authenticate('jwt', { session: false });

// Geração do token JWT
exports.getToken = function (user) {
    return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: 60*60*1 }); // 3600 * 2 segundos = 2 hora
};
