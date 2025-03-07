const express = require('express');
const urlController = require('../controllers/urlController');
const { isLoggedIn } = require('../middleware/validate');

const router = express.Router();
router.get('/', isLoggedIn, urlController.getUrlsByOrganizationId);
router.post('/', isLoggedIn, urlController.createUrl);
router.put('/:id/clicks', urlController.incrementClicks);
router.delete('/:id', urlController.deleteUrl);

module.exports = router;