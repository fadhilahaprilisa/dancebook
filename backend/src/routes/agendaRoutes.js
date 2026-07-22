const express = require('express');
const router = express.Router();
const controller = require('../controllers/agendaController');

router.get('/', controller.getAgendas);
router.post('/', controller.createAgenda);
router.put('/:id', controller.updateAgenda);
router.delete('/:id', controller.deleteAgenda);

module.exports = router;
