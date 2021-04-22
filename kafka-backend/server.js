var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var login = require('./services/login')
var register = require('./services/register')
var dashboard = require('./services/dashboard')
var groupList = require('./services/groupList')
var inviteList = require('./services/inviteList')
var addBill = require('./services/addBill')
var newComment = require('./services/newComment')
var settle = require('./services/settle')
var profile = require('./services/profile')
var history = require('./services/history')
const mongoose = require('mongoose');
const uri = "mongodb+srv://admin:rootadmin@splitdb.6smji.mongodb.net/Splitwise?retryWrites=true&w=majority";
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};

mongoose.connect(uri, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
})

mongoose.set('useFindAndModify', false);

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        // console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        console.log(data)
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
// handleTopicRequest("post_book",Books)
handleTopicRequest("login",login)
handleTopicRequest("register",register)
handleTopicRequest("dashboard",dashboard)
handleTopicRequest("group_list",groupList)
handleTopicRequest("invite_list",inviteList)
handleTopicRequest("add_bill",addBill)
handleTopicRequest("new_comment",newComment)
handleTopicRequest("settle",settle)
handleTopicRequest("profile",profile)
handleTopicRequest("history",history)
