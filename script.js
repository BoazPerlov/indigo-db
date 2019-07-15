const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema }= require('graphql');
const mongoose = require('mongoose');
const Transaction = require('./models/event')

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema('\
        type Transaction {\
            _id: ID!\
            SageRef: String!\
            Rep: String!\
            Country: String!\
            Postcode: String\
            Latitude: Float\
            Longitude: Float\
            Customer: String!\
            Brand: String!\
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
        input TransactionInput {\
            SageRef: String!\
            Rep: String!\
            Country: String!\
            Postcode: String\
            Latitude: Float\
            Longitude: Float\
            Customer: String!\
            Brand: String!\
            Label: String!\
            County: String!\
            ProductCode: String!\
            Quantity: Float!\
            Turnover: Float!\
            CostPriceAverage: Float!\
            Profit: Float!\
            Currency: String!\
            Date: String\
            FinancialYear: String\
        }\
        type RootQuery {\
            transactions: [Transaction!]!\
        }\
        \
        type RootMutation {\
            createTransaction(transactionInput: TransactionInput): Transaction\
        }\
        \
        schema {\
            query: RootQuery\
            mutation: RootMutation\
        }\
    '),
    rootValue: {
        transactions: () => {
            return Transaction.find().then(transactions => {
                return transactions.map(transaction => {
                    return { ...transaction._doc, _id: transaction.id };
                });
            }).catch(err => {
                throw err;
            });
        },
        createTransaction: (args) => {
            const transaction = new Transaction({
                SageRef: args.transactionInput.SageRef,
                Rep: args.transactionInput.Rep,
                Country: args.transactionInput.Country,
                Postcode: args.transactionInput.Postcode,
                Latitude: args.transactionInput.Latitude,
                Longitude: args.transactionInput.Longitude,
                Customer: args.transactionInput.Customer,
                Label: args.transactionInput.Label,
                County: args.transactionInput.County,
                Brand: args.transactionInput.Brand,
                ProductCode: args.transactionInput.ProductCode,
                Quantity: args.transactionInput.Quantity,
                Turnover: args.transactionInput.Turnover,
                CostPriceAverage: args.transactionInput.CostPriceAverage,
                Profit: args.transactionInput.Profit,
                Currency: args.transactionInput.Currency,
                Date: new Date(args.transactionInput.Date),
                FinancialYear: args.transactionInput.FinancialYear
            });
            return transaction
                .save()
                .then(result => {
                    console.log(result);
                    return {...result._doc, _id: transaction.id};
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