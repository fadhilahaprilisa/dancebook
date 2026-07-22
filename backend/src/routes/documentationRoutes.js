const express = require('express');
const router = express.Router();
const controller = require('../controllers/documentationController');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', controller.getDocumentations);
router.post('/', upload.single('file'), controller.createDocumentation);
router.delete('/:id', controller.deleteDocumentation);

module.exports = router;
