const users = require("../model/UsersModel");
const userRelation = require("../model/UserRelationModel");
const groups = require("../model/GroupModel");
const transactions = require("../model/TransactionModel");

const resolvers = {
  Query: {
    hello: () => {
      return `hey sup ? `;
    },
    currentUser: async (parent, args, context, info) => {
      values = await users.findOne({ _id: args.userId }).then((res) => {
        console.log(args.userId);
        return res;
      });
      return values;
    },
    userList: async (parent, args, context, info) => {
      values = await users.find({ _id: { $ne: args.userId } }).then((res) => {
        return res;
      });
      return values;
    },
    dashboardData: async (parents, args, context, info) => {
      values = await userRelation
        .find({ user1: args.userId })
        .then(async (result) => {
          let newDataBlock = {};
          for (let i = 0; i < result.length; i++) {
            if (result[i].user2 in newDataBlock) {
              let updatedBalance =
                newDataBlock[result[i].user2].amount + result[i].balance;
              newDataBlock[result[i].user2].amount = updatedBalance;
              if (updatedBalance >= 0) {
                newDataBlock[result[i].user2].typeClass = true;
              } else {
                newDataBlock[result[i].user2].typeClass = false;
              }
            } else {
              let userinfo = await users
                .findOne({ _id: result[i].user2 })
                .exec();
              console.log();
              newDataBlock[result[i].user2] = {
                id: result[i].user2,
                Fname: userinfo.Fname,
                amount: result[i].balance,
                typeClass: result[i].balance >= 0 ? true : false,
              };
            }
          }
          return newDataBlock;
        });
      console.log(values);
      return values;
    },
    getGroups: async (parents, args, context, info) => {
      values = await groups.find(
        {
          groupMembers: {
            $elemMatch: { userId: args.userId, inviteStatus: 1 },
          },
        },
        (err, result) => {
          return result;
        }
      );
      return values;
    },
    getInvites: async (parents, args, context, info) => {
      values = await groups.find(
        {
          groupMembers: {
            $elemMatch: { userId: args.userId, inviteStatus: 0 },
          },
        },
        (err, result) => {
          return result;
        }
      );
      return values;
    },
    getGroup: async (parents, args, context, info) => {
      values = await groups.findById(args.groupId).then(async (result) => {
        balance = await userRelation.find({
          groupId: args.groupId,
          user1: args.userId,
        });
        console.log(balance);
        return result;
      });
      return values;
    },
    getGroupPageMembers: async (parents, args, context, info) => {
      values = await groups.findById(args.groupId).then(async (result) => {
        balanceData = await userRelation.find({
          groupId: args.groupId,
          user1: args.userId,
        });
        console.log(balanceData);
        let newMemberList1 = [];
        for (let i = 0; i < balanceData.length; i++) {
          await users.find({ _id: balanceData[i].user2 }, (err, names) => {
            //creating member list to send to frontend
            console.log(names);
            newMemberList1.push({
              name: names[0].Fname,
              amount:
                balanceData[i].balance >= 0
                  ? balanceData[i].balance
                  : 0 - balanceData[i].balance,
              status: balanceData[i].balance >= 0 ? true : false,
            });
          });
        }
        return newMemberList1;
      });
      return values;
    },
    getGroupTransactions: async (parents, args, context, info) => {
      values = await transactions
        .find({ groupId: args.groupId })
        .then((trans) => {
          let newTransactionList = [];
          trans.forEach((element) => {
            let transaction = {
              id: element._id,
              discription: element.discription,
              amount: element.amount,
              typeClass: element.userId == args.currentUser ? true : false,
              Fname: element.Fname,
              ts: element.createdAt,
              comments: element.comments,
            };
            newTransactionList.push(transaction);
          });
          return newTransactionList;
        });
      return values;
    },
  },
};

module.exports = { resolvers };
