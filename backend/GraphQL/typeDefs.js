const { gql } = require("apollo-server");

const typeDefs = gql`
  input UserInput {
    email: String
  }
  type Query {
    currentUser(userId: String): user
    userList(userId: String): [users]
    dashboardData(userId: String): [user]
    getGroups(userId: String):[group]
    getInvites(userId: String):[group]
    getGroup(groupId: String, userId:String):group
    getGroupPageMembers(groupId: String, userId: String):[groupPageMemberList]
    getGroupTransactions(groupId: String, userId: String):[transaction]
    hello: String
  }
  type users {
    _id: String
    username: String
    Fname: String
  }
  type user {
    _id: String
    username: String
    Fname: String
    password: String
    phoneNumber: String
    lang: String
    currency: String
    timeZone: String
    imgPath: String
  }
  type group {
    _id: String
    groupName: String
    groupMembers: [member]
  }
  type member {
      userId: String,
      inviteStatus: Int
  }
  type groupPageMemberList {
      name: String
      amount: Float
      status: Boolean
  }
  type transaction {
    id: String
    discription: String
    amount: Float
    typeClass: Boolean
    Fname: String
    ts: String
    comments: [comment]
  }
  type comment {
      timePosted: String
      commentText: String
      Fname: String
      userId: String
  }
`;

module.exports = { typeDefs };
