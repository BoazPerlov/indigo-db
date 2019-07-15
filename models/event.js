const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    SageRef: {
        type: String,
        required: true
    },
    Rep: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        required: true
    },
    Postcode: {
        type: String,
        required: false
    },
    Latitude: {
        type: Number,
        required: false
    },
    Longitude: {
        type: Number,
        required: false
    },
    Customer: {
        type: String,
        required: true
    },
    Label: {
        type: String,
        required: true
    },
    County: {
        type: String,
        required: true
    },
    Brand: {
        type: String,
        required: false
    },
    ProductCode: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    Turnover: {
        type: Number,
        required: true
    },
    CostPriceAverage: {
        type: Number,
        required: true
    },
    Profit: {
        type: Number,
        required: true
    },
    Currency: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        required: false
    },
    FinancialYear: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);