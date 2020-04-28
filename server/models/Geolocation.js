const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point',
    },
    coordinates: {
        type: [Number],
        required: true,
    }
});

const geoLocationSchema = new mongoose.Schema({
    location: {
        type: pointSchema,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    user: {
        type: String,
        required: true,
    }
});

class GeoLocation {

}

geoLocationSchema.loadClass(GeoLocation);
geoLocationSchema.index({ location: '2dsphere' })

module.exports = GeoLocationModel = mongoose.model('geolocation', geoLocationSchema);
