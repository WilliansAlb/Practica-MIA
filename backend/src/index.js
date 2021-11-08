const express = require('express');
const app = express();
const axios = require("axios");

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const workerhost = process.env.WORKER_HOST;
const workerport = process.env.WORKER_PORT;

app.post('/operar', async (req, res) => {
    var numero1 = req.body.numero1;
    var numero2 = req.body.numero2;
    var operador = req.body.operador;
    var resultado;
    var respuesta = 200;
    var operacion = "";
    if (!isNaN(parseFloat(numero1)) && !isNaN(parseFloat(numero2))) {
        switch (operador) {
            case "*":
                operacion = "multiplicacion/";
                break;
            case "/":
                if (numero2 == 0) {
                    resultado = "Error: division entre 0";
                    respuesta = 400;
                } else {
                    operacion = "division/";
                }
                break;
            case "+":
                operacion = "suma/";
                break;
            case "-":
                operacion = "resta/";
                break;
            case "^":
                operacion = "potencia/";
                break;
            default:
                resultado = "Error: Enviaste una operación que no existe solo se aceptan + - / * ^";
                respuesta = 400;
                break;
        }
    } else {
        resultado = "Error: Para los parametros numero1 y numero2 solo son aceptados numeros";
        respuesta = 400;
    }
    if (respuesta==200){
        const params = {
            ope1: numero1,
            ope2: numero2
        };
        console.log('http://' + workerhost + ':' + workerport + '/math/'+ operacion);
        await axios.get('http://' + workerhost + ':' + workerport + '/math/' + operacion, { port: Number.parseInt(workerport), params })
        .then(response => {
            res.status(respuesta).json({ operacion: numero1+" "+operador+" "+numero2+" = "+response.data.result, resultado: response.data.result }).status(201);
        })
        .catch(error => {
            res.send("ERROR: "+error);
        });
    } else {
        res.status(respuesta).json({ operacion: numero1+" "+operador+" "+numero2+" = ?", resultado: resultado });
    }
});

app.get('/operar', (req, res) => {
    var numero1 = req.body.numero1;
    var numero2 = req.body.numero2;
    var operador = req.body.operador;
    var resultado;
    var respuesta = 200;
    if (!isNaN(parseFloat(numero1)) && !isNaN(parseFloat(numero2))) {
        switch (operador) {
            case "*":
                resultado = numero1 * numero2;
                break;
            case "/":
                if (numero2 == 0) {
                    resultado = "Error: division entre 0";
                    respuesta = 400;
                } else {
                    resultado = numero1 / numero2;
                }
                break;
            case "+":
                resultado = parseInt(numero1) + parseInt(numero2);
                break;
            case "-":
                resultado = numero1 - numero2;
                break;
            case "^":
                resultado = Math.pow(numero1, numero2);
                break;
            default:
                resultado = "Error: Enviaste una operación que no existe solo se aceptan + - / * ^";
                respuesta = 400;
                break;
        }
    } else {
        resultado = "Error: Para los parametros numero1 y numero2 solo son aceptados numeros";
        respuesta = 400;
    }
    res.status(respuesta).json({ resultado: resultado });
});

app.use((req, res, next) => {
    res.status(404);
});

app.listen(3001, () => console.log('Escuchando en el puerto 3001'));