const { gql } = require("apollo-server");

const typeDefs = gql`
  input UserInput {
    username: String!
    password: String!
    Fname: String!
    imgPath: String
    phoneNumber: String
    currency: String
    timeZone: String
  }
  type Query {
    login(username: String, password: String): user
    currentUser(userId: String): user
    userList(userId: String): [users]
    dashboardData(userId: String): [user]
    getGroups(userId: String): [group]
    getInvites(userId: String): [group]
    getGroup(groupId: String, userId: String): group
    getGroupPageMembers(groupId: String, userId: String): [groupPageMemberList]
    getGroupTransactions(groupId: String, userId: String): [transaction]
    getHistory(userId: String): [historyTransaction]
    getGroupList(userId: String): [String]
    hello: String
  }
  type Mutation {
    signUp(
      username: String!
      password: String!
      Fname: String!
      imgPath: String
      phoneNumber: String
    ): signUpReturn
    AcceptInvite(userId: String, groupId: String): Boolean
    RejectInvite(userId: String, groupId: String): Boolean
    addBill(
      userId: String
      groupId: String
      amount: Float
      discription: String
    ): Boolean
    addComment(
      userId: String
      Fname: String
      transactionId: String
      comment: String
    ): Boolean
    createGroup(
      userId: String
      groupName: String
      memberList: [String]
    ): Boolean
    updateProfile(
      _id: String!
      username: String
      Fname: String
      imgPath: String
      phoneNumber: String
      lang: String
      currency: String
      timeZone: String
      imgPath: String
    ): user
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
    userId: String
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
  type historyTransaction {
    payer: String
    payee: String
    discription: String
    amount: Float
    group: String
    status: Boolean
    timeStam: String
  }
  type groupList {
    name: [String]
  }
  type signUpReturn {
    userId: String
    message: String
    token: String
    expiresIn: String
  }
`;

module.exports = { typeDefs };
