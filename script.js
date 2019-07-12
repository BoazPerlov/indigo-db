const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema }= require('graphql');
const mongoose = require('mongoose');
const Event = require('./models/event')

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema('\
        type Event {\
            _id: ID!\
            SageRef: String!\
            Rep: String!\
            Country: String!\
            Postcode: String!\
            Latitude: Float!\
            longitude: Float!\
            Customer: String!\
            Label: String!\
            County: String!\
            ProductCode: String!\
            Quantity: Float!\
            Turnover: Float!\
            CostPriceAverage: Float!\
            Profit: Float!\
            Currency: String!\
            Date: String!\
            FinancialYear: String\
        }\
        input EventInput {\
            SageRef: String!\
            Rep: String!\
            Country: String!\
            Postcode: String!\
            Latitude: Float!\
            Longitude: Float!\
            Customer: String!\
            Label: String!\
            County: String!\
            ProductCode: String!\
            Quantity: Float!\
            Turnover: Float!\
            CostPriceAverage: Float!\
            Profit: Float!\
            Currency: String!\
            Date: String!\
            FinancialYear: String\
        }\
        type RootQuery {\
            events: [Event!]!\
        }\
        \
        type RootMutation {\
            createEvent(eventInput: EventInput): Event\
        }\
        \
        schema {\
            query: RootQuery\
            mutation: RootMutation\
        }\
    '),
    rootValue: {
        events: () => {
            return Event.find().then(events => {
                return events.map(event => {
                    return { ...event._doc, _id: event.id };
                });
            }).catch(err => {
                throw err;
            });
        },
        createEvent: (args) => {
            const event = new Event({
                SageRef: args.eventInput.SageRef,
                Rep: args.eventInput.Rep,
                Country: args.eventInput.Country,
                Postcode: args.eventInput.Postcode,
                Latitude: args.eventInput.Latitude,
                Longitude: args.eventInput.Longitude,
                Customer: args.eventInput.Customer,
                Label: args.eventInput.Label,
                County: args.eventInput.County,
                Brand: args.eventInput.Brand,
                ProductCode: args.eventInput.ProductCode,
                Quantity: args.eventInput.Quantity,
                Turnover: args.eventInput.Turnover,
                CostPriceAverage: args.eventInput.CostPriceAverage,
                Profit: args.eventInput.Profit,
                Currency: args.eventInput.Currency,
                Date: new Date(args.eventInput.Date),
                FinancialYear: args.eventInput.FinancialYear
            });
            return event
                .save()
                .then(result => {
                    console.log(result);
                    return {...result._doc, _id: event.id};
                }).catch(err => {
                    console.log(err);
                    throw err;
            });
        }
    },
    graphiql: true
}));

mongoose.connect('mongodb+srv://Indigo:2bJlueA4E9nuQoXH@indigo-db-shg3l.mongodb.net/indigo-db?retryWrites=true&w=majority').then(() => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
})