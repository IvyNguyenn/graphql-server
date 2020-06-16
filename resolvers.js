const uniqid = require("uniqid");
const { USERS, POSTS } = require("./dummyData");

const resolvers = {
  Query: {
    user: (root, args) => USERS.find((user) => user.id === args.id),
    users: (root, args) => USERS,
    post: (root, args) => POSTS.find((post) => post.id === args.id),
    posts: (root, args) => POSTS,
  },

  Mutation: {
    createUser: (root, { input }) => {
      const user = {
        id: uniqid(),
        ...input,
      };

      USERS.push(user);
      return user;
    },

    updateUser: (root, { input }) => {
      const indexOldUser = USERS.findIndex((i) => i.id === input.id);
      const newUser = { ...USERS[indexOldUser], ...input };
      USERS[indexOldUser] = newUser;
      // return newUser;
      return newUser;
    },

    deleteUser: (root, { id }) => {
      const oldLength = USERS.length;
      // find the index of element that will be deleted
      const indexOldUser = USERS.findIndex((i) => i.id === id);
      USERS.splice(indexOldUser, 1);

      const newLength = USERS.length;
      if (oldLength <= newLength) {
        return false;
      }
      return true;
    },
  },

  // User: {}
};

module.exports = resolvers;
