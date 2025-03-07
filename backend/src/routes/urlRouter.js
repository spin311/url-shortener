const express = require('express');
const urlController = require('../controllers/urlController');
const { isLoggedIn, canDeleteUrl } = require('../middleware/validate');

const router = express.Router();
router.get('/', isLoggedIn, urlController.getUrlsByOrganizationId);
router.post('/', isLoggedIn, urlController.createUrl);
router.put('/:id/clicks', urlController.incrementClicks);
router.put('/:id/extend', urlController.extendUrl);
router.delete('/:id', isLoggedIn, canDeleteUrl, urlController.deleteUrl);

module.exports = router;