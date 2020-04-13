const express = require("express")
const app = express()

//Settings configuraciones
app.set('port',  process.env.PORT || 3000)

// Middlewares se ejecuta antes de que llegen alas ruta
// si recivimos un json ps gracias a esta linea nuestro modulo de express podra entenderlo lo convertira y luego lo hara accesible a nuestra rutas, es decir podremos acceder ala informacion gracias a esta confuguracion
app.use(express.json())

//Routes
app.use(require('./routes/employees'))


app.listen(app.get('port'), ()=>{

   console.log('Server run port', app.get('port'));
})