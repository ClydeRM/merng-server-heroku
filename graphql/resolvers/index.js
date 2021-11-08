const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require("./comments");

module.exports = {
  Post: {
    // Post modifier , everytimes post a new post, This modifier will action
    // In this case parent is from getPost query
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length
  },
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
};
