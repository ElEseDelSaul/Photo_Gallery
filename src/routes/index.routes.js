const { Router } = require('express');

//Controller
const {
    listGames,
    renderFomAdd,
    addNewGame,
    deleteGame
} = require('../controllers/index.controllers');

class IndexRoutes {

    constructor() {
        this.router = Router();
        this.Routes();
    }

    Routes() {
        //listar
        this.router.get('/', listGames);

        //Renderizando formulario y listar las photos
        this.router.get('/images/add', renderFomAdd);

        //Agregar
        this.router.post('/images/add', addNewGame);

        //Eliminar
        this.router.get('/images/delete/:id', deleteGame)
    }

}

const indexRoutes = new IndexRoutes();
module.exports = indexRoutes.router;