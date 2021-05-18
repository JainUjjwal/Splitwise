const users = require("../model/UsersModel");
const userRelation = require("../model/UserRelationModel");
const groups = require("../model/GroupModel");
const transactions = require("../model/TransactionModel");
const bcrypt = require("bcrypt");
const utils = require("../lib/utils");

const resolvers = {
  Query: {
    login: async (parent, args, context, info) => {
      const { username, password } = args;
      values = await users.find({ username: username }).then((result) => {
        console.log(result);
        if (result.length > 0) {
          return bcrypt
            .compare(password, result[0].password)
            .then((response) => {
              if (response) {
                console.log("success");
                console.log(result);
                const tokenObject = utils.issueJWT(result[0]);
                return {
                    userId: result[0]._id,
                    Fname: result[0].Fname,
                    message: "Successful Login",
                    success: true,
                    token: tokenObject.token,
                    expiresIn: tokenObject.expires,
                  }
              } else {
                throw new Error("Username and Password combination incorrect");
              }
            });
        } else {
          throw new Error("User does not exist");
        }
      });
      return values
    },
    currentUser: async (parent, args, context, info) => {
      values = await users.findOne({ _id: args.userId }).then((res) => {
        console.log(`fetched user information for ${args.userId}`);
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
    getHistory: async (parents, args, context, info) => {
      console.log(args);
      const currentUser = args.userId;
      values2 = await groups
        .find({ "groupMembers.userId": currentUser })
        .then(async (result) => {
          let sendData = await fetchFormattedTransactions(result, currentUser);
          // console.log(sendData);
          let newStore = sendData.newStore;
          let groupList = sendData.groupList;
          // res.status(200).send({ newStore, groupList });
          return newStore;
        });
      return values2;
    },
    getGroupList: async (parents, args, context, info) => {
      console.log(args);
      const currentUser = args.userId;
      values2 = await groups
        .find({ "groupMembers.userId": currentUser })
        .then(async (result) => {
          let sendData = await fetchFormattedTransactions(result, currentUser);
          // console.log(sendData);
          let newStore = sendData.newStore;
          let groupList = sendData.groupList;
          // res.status(200).send({ newStore, groupList });
          console.log(groupList);
          return groupList;
        });
      return values2;
    },
  },
  Mutation: {
    signUp: async (parent, args, context, info) => {
      let uploadPath = "";
      const saltRounds = 10;
      const { username, password, Fname, phoneNumber } = args;
      if (args.files) {
        const image = args.files.image;
        uploadPath =
          "D:/SJSU/CMPE 273/splitwise/frontend/public/userImages/" +
          username +
          ".jpg";
        image.mv(uploadPath, function (err) {
          if (err) console.log(err);
        });
      }
      values = await bcrypt.hash(password, saltRounds).then(async (hash) => {
        const data = {
          username: username,
          Fname: Fname,
          phoneNumber: phoneNumber,
          lang: "English",
          currency: "USD",
          password: hash,
          imgPath: uploadPath,
          timeZone: "PST",
        };
        return await users.find({ username: username }).then(async (result) => {
          // console.log(result);
          if (result.length > 0) {
            throw new Error("user already exists");
          } else {
            let newUser = new users(data);
            return await newUser.save().then((result) => {
              //   req.session.user = newUser;
              const jwt = utils.issueJWT(result);
              return {
                userId: result._id,
                message: "Sign up successful",
                token: jwt.token,
                expiresIn: jwt.expires,
              };
            });
          }
        });
      });
      console.log(values);
      return values;
    },
    AcceptInvite: async (parent, args, context, info) => {
      const { userId, groupId } = args;
      values = await groups
        .findOneAndUpdate(
          { _id: groupId, "groupMembers.userId": userId },
          { $set: { "groupMembers.$.inviteStatus": 1 } },
          { new: true }.then(async (updateResult) => {
            console.log("\n\n\n Update Result");
            console.log(updateResult);
            let updateObj = [];
            updateResult.groupMembers.forEach((member) => {
              if (member.inviteStatus == 1 && member.userId != userId) {
                updateObj.push({
                  user1: userId,
                  user2: member.userId,
                  balance: 0,
                  groupId: updateResult._id,
                });
                updateObj.push({
                  user1: member.userId,
                  user2: userId,
                  balance: 0,
                  groupId: updateResult._id,
                });
              }
            });
            updateObj.forEach(async (element) => {
              let newUserRelation = new userRelation(element);
              await newUserRelation.save().then(console.log("saved"));
            });
          })
        )
        .then(() => {
          return true;
        });
      console.log(values);
      return values;
    },
    RejectInvite: async (parent, args, context, info) => {
      const { userId, groupId } = args;
      values = await groups
        .findOneAndUpdate(
          { _id: groupId },
          { $pull: { groupMembers: { userId: userId } } },
          { new: true }
        )
        .then((result) => {
          console.log(result);
          return true;
        })
        .catch((err) => {
          console.log(err);
          throw new Error("Failed to reject invite");
        });
      return values;
    },
    addComment: async (parent, args, context, info) => {
      const { userId, transactionId, Fname, comment } = args;
      // values = await

      // return values
    },
    createGroup: async (parent, args, context, info) => {
      const { userId, groupId, memberList } = args;
      // values = await

      // return values
    },
    updateProfile: async (parent, args, context, info) => {
      const {
        _id,
        Fname,
        username,
        phoneNumber,
        imgPath,
        lang,
        timeZone,
        currency,
      } = args;
      // values = await

      // return values
    },
  },
};

// Helper function for fetching groupPage Data
const fetchFormattedTransactions = async (result, currentUser) => {
  let newStore = [];
  let groupList = [];
  for (let j = 0; j < result.length; j++) {
    if (!groupList.includes(result[j].groupName)) {
      groupList.push(result[j].groupName);
    }
    await transactions.find(
      { groupId: result[j]._id },
      (err, transactionResult) => {
        // EACH TRANSACTION BEING PUSHED GROUPWISE
        for (let i = 0; i < transactionResult.length; i++) {
          let entry = {
            payer:
              transactionResult[i].userId != currentUser
                ? transactionResult[i].Fname
                : "You",
            payee: "john doe",
            discription: transactionResult[i].discription,
            amount: transactionResult[i].amount,
            group: result[j].groupName,
            status: transactionResult[i].userId != currentUser ? false : true,
            timeStamp: transactionResult[i].createdAt,
          };
          newStore.push(entry);
        }
      }
    );
  }
  // console.log(newStore)
  return { newStore, groupList };
};
module.exports = { resolvers };
