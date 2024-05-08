const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { verifyToken } = require('../src/utils/utils.js');
const sequelize = require('../src/db/db.js');
const typeDefs = require('../src/graphql/typedefs/schema.js');
var personResolvers = require('../src/graphql/modules/user/resolvers/person.resolvers.js');
var eventResolvers = require('../src/graphql/modules/event/resolvers/event.resolvers.js');

require('dotenv').config();
async function startServer() {
    try {
        await sequelize.sync({ force: false });
        const server = new ApolloServer({
            typeDefs,
            resolvers: [personResolvers, eventResolvers],
        });
        const { url } = await startStandaloneServer(server, {
            context: async ({ req }) => {
                try {
                    const authorizationHeader = req.headers.authorization || '';
                    const token = authorizationHeader.replace('Bearer ', '');
                    if (token) {
                        const user = verifyToken(token);
                        return { user };
                    }
                    else {
                        return {};
                    }
                }
                catch (error) {
                    console.error(error);
                    return {};
                }
            },
            listen: { port: 4000 },
        });
        console.log('Server running on ' + url);
    }
    catch (error) {
        console.error('Error starting server:', error);
    }
}
startServer();
