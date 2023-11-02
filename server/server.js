if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

console.log('The PORT is:', process.env.PORT);
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphQL/typeDefs');
const resolvers = require('./graphQL/resolvers');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/RootRoutineDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    app.use(express.json());

    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer();