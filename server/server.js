const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');

const sequelize = require('./config/connection');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');


const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});
  
server.applyMiddleware({ app });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../react-ui/build')));
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../react-ui/build/index.html'));
});

sequelize.sync({ force: false }).then(() => {
    try {
        app.listen(PORT, () => console.log('Now listening'));
    } catch (err) {
        console.log(`Server will not start Error: ${err}`)
    }
});
