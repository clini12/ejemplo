const express = require('express')
const morgan = require ('morgan')
const path = require('path')
const app = express()
const session = require('express-session');
//const upload = require('../libs/storage')
const homeRoutes = require('./routes/home-routes');
const home1Routes = require('./routes/home1-routes');
const home2Routes = require('./routes/home2-routes');
const home3Routes = require('./routes/homeroutes');
//conexion de la base de datos
const connection = require('./database/conexiondb')
//configuracionones
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'vistas'))
//middlewares
app.use(express.urlencoded({extend: true}))
app.use(express.json())
app.use(morgan('dev'))
//require('dotenv').config()
app.use(express.static(path.join(__dirname,'public')))
//rutas
app.get('/', (req, res) => {
    res.render('principal')
})
app.use('/autos',require('./routes/autosr'))
app.use('/agendaReuma',require('./routes/agenda_calR1'))
app.use('/registro',require('./routes/registroR'))
app.use('/home',require('./routes/homeR'))
app.use('/agenda',require('./routes/agendaR'))
app.use('/agenda3',require('./routes/Agenda1'))
app.use('/agendas',require('./routes/agendaRM'))
app.use('/paciente',require('./routes/pacienteR'))
app.use('/pacientes',require('./routes/pacienteR2'))
app.use('/ajustes',require('./routes/ajustesR'))
app.use('/nota',require('./routes/notaR'))
app.use('/notaC',require('./routes/notaCR'))
app.use('/notaO',require('./routes/notaO'))
app.use('/notaT',require('./routes/notaT'))
app.use('/carta',require('./routes/cartaR'))
app.use('/cartaO',require('./routes/cartaO'))
app.use('/enfermeria',require('./routes/enfermeria'))
app.use('/operacion',require('./routes/operacionR'))
app.use('/traumatologia',require('./routes/traumatologia'))
app.use('/oftamologo',require('./routes/ofta/menu-ofta'))
app.use('/reumatologo',require('./routes/reuma/menu-reuma'))
app.use('/traumatologo',require('./routes/trauma/menu-trauma'))
app.use('/fisio',require('./routes/fisio/menu-fisio'))
app.use('/medicos',require('./routes/ofta/medicos'))
app.use('/medico',require('./routes/ofta/medicos1'))
app.use('/calenda',require('./routes/ofta/calendario'))
app.use('/agenda1',require('./routes/agenda_calR2'))
app.use('/agenda2',require('./routes/agenda_calR3'))
app.use('/agendaF',require('./routes/agendaF'))
app.use('/pacienteO',require('./routes/pacienteO'))
app.use('/pacienteT',require('./routes/pacienteT'))
app.use('/pacienteF',require('./routes/pacienteF'))
app.use('/paciente1',require('./routes/paciente2'))
app.use('/paciente2',require('./routes/paciente3'))
app.use('/receta1',require('./routes/recetaR'))
app.use('/receta2',require('./routes/recetaO'))
app.use('/receta3',require('./routes/recetaT'))
app.use('/receta1',require('./routes/recetaR'))
app.use('/receta2',require('./routes/recetaO'))
app.use('/receta3',require('./routes/recetaT'))
app.use('/pacienteTerapia',require('./routes/pacienteTerapia'))
app.use('/docs', express.static(path.join(__dirname, 'docs')));
app.use(homeRoutes.routes);
app.use(home1Routes.routes);
app.use(home2Routes.routes);
app.use(home3Routes.routes);
//configuracion de session
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
//configuración del servidor htpp://localhost:3000/
app.listen(3000, () => console.log('el servidor en http://localhost:3000'));
//////////////////****************************************** */
//codigo para realizar el login
 //http://localhost:3000/auth
 app.post('/auth',function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.redirect('/');
			}			
			response.end();
		});
	} else {
		response.send('Por favor ingresa Usuario y Contraseña!');
		response.end();
	}
});

// http://localhost:3000/home
app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Te has logueado satisfactoriamente:, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('¡Inicia sesión para ver esta página!');
	}
	response.end();
});