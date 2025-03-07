const urlModel = require('../models/urlModel');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);
const getBaseUrl = require('../utils/getBaseUrl');
const createError = require('http-errors');
async function createUrl(req, res, next) {
    try {
        const longUrl = req.body.url;
        const { user } = req;
        const shortCode = nanoid();
        const baseUrl = getBaseUrl(longUrl);
        if (!baseUrl) {
            return next(createError(400, 'Invalid URL'));
        }
        const shortUrl = `${baseUrl}/${shortCode}`;
        const url = await urlModel.createUrl(shortUrl, longUrl, user);
        if (!url) {
            return next(createError(500, 'URL not created'));
        }
        res.status(201).json({
            status: 'success',
            data: {
                shortUrl,
                longUrl
            }
        });
    } catch (e) {
        next(e);
    }
}

async function deleteUrl(req, res, next) {
    try {
        const { id } = req.params;
        const url = await urlModel.deleteUrl(id);
        if (!url) {
            return next(createError(404, 'URL not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'URL deleted successfully'
        });
    } catch (e) {
        next(e);
    }
}

async function getUrlsByOrganizationId(req, res, next) {
    try {
        const organizationId = req.user?.organization_id;
        const urls = await urlModel.getUrlsforCurrentOrganization(organizationId);
        if (!urls) {
            return next(createError(404, 'URLs for organization not found'));
        }
        res.status(200).json({
            status: 'success',
            data: urls
        });
    } catch (e) {
        next(e);
    }
}

async function incrementClicks(req, res, next) {
    try {
        const id = req.params.id;
        const url = await urlModel.incrementClicks(id);
        if (!url) {
            return next(createError(404, 'URL not found'));
        }
    } catch (e) {
        next(e);
    }
}

module.exports = {
    createUrl,
    deleteUrl,
    getUrlsByOrganizationId,
    incrementClicks
}

