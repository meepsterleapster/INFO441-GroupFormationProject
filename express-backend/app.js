import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import usersRouter from './routes/profile.js';
import groupsRouter from './routes/groups.js';
import { createProxyMiddleware } from 'http-proxy-middleware';
import session from 'express-session';
import request from 'request';
//import models from './models.js'
import { initModels } from './models.js'; 
//import usersRouter from './routes/users.js';


// npm install "https://gitpkg.now.sh/kylethayer/ms-identity-javascript-nodejs-tutorial-msal-node-v2-/Common/msal-node-wrapper?main"

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const models = await initModels();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
	req.models = models
	next();
})

app.use(session({
	secret: 'your_secret_key',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 24 * 60 * 60 * 1000 // 1 day
	}
})
)


import WebAppAuthProvider from 'msal-node-wrapper'

const authConfig = {
	auth: {
		clientId: "d6d21e51-a295-4b0e-b79c-fedcff02e6eb",
		authority: "https://login.microsoftonline.com/f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
		clientSecret: "4KE8Q~bIrtcI5UOzxJybQW0Jh6peVTteke8TOb4w",
		redirectUri: "/redirect"
	},
	system: {
		loggerOptions: {
			loggerCallback(loglevel, message, containsPii) {
				console.log(message);
			},
			piiLoggingEnabled: false,
			logLevel: 3,
		}
	}
};

app.enable('trust proxy')



const authProvider = await WebAppAuthProvider.WebAppAuthProvider.initialize(authConfig);
app.use(authProvider.authenticate());

app.get('/signin', (req, res, next) => {
	return req.authContext.login({
		postLoginRedirectUri: "/", // redirect here after login
	})(req, res, next);

});
app.get('/signout', (req, res, next) => {
	return req.authContext.logout({
		postLogoutRedirectUri: "/", // redirect here after logout
	})(req, res, next);

});

app.use('/profile', usersRouter);

app.use('/groups', groupsRouter);

app.use('/*', createProxyMiddleware({
	target: 'http://localhost:4000',
    //target: 'https://groupin-1fb78.web.app/',
    changeOrigin: true,
    pathRewrite: (path, req) => req.baseUrl
}));

// use this by going to urls like: 
// http://localhost:3000/fakelogin?name=anotheruser
app.get('/fakelogin', (req, res) => {
    let newName = req.query.name;
    let session=req.session;
    session.isAuthenticated = true;
    if(!session.account){
        session.account = {};
    }
    session.account.name = newName;
    session.account.username = newName;
    console.log("set session");
    //res.redirect("/api/v3/users/myIdentity");
});

// use this by going to a url like: 
// http://localhost:3000/fakelogout
app.get('/fakelogout', (req, res) => {
    let newName = req.query.name;
    let session=req.session;
    session.isAuthenticated = false;
    session.account = {};
    console.log("you have fake logged out");
    res.redirect("/api/v3/users/myIdentity");
});

export default app;