const AnalyticsEvent = require('../models/AnalyticsEvent');

const trackEvent = async (req, res, next) => {
    console.log('Миддлвер аналитики сработал для роута:', req.method, req.originalUrl);
    try {
        await AnalyticsEvent.create({
            path: req.originalUrl,
            method: req.method,
            userId: req.user ? req.user.id : null,
            productId: req.product ? req.product.id : null,
            timestamp: new Date()
        })
    }
    catch (error) {
        console.error(error);
    }
    next();
}

module.exports = trackEvent;