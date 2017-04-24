// var redis = require("github.com/quilt/redis");

// var javaApp = new Container(new Image("java-redis-image",
//   "FROM nginx\n" +
//   "RUN cd /web_root && git clone github.com/osalpekar/java-redis-webapp"
// ))

// var namespace = createDeployment({});

// var rds = new redis.Redis(1, "AUTH_PASSWORD");
// rds.exclusive();
// var jAppService = new Service("jApp", [javaApp]);

// var baseMachine = new Machine({
//     provider: "Amazon",
//     cpu: new Range(1),
//     ram: new Range(2),
//     sshKeys: githubKeys("osalpekar"),
// });

// namespace.deploy(baseMachine.asMaster());
// namespace.deploy(baseMachine.asWorker().replicate(2));

// namespace.deploy(rds);
// namespace.deploy(jAppService);


var javaApp = require("github.com/osalpekar/java-redis-spec");
var deployment = createDeployment();
var baseMachine = new Machine({
    provider: "Amazon", 
    sshKeys: githubKeys("osalpekar"),
});
deployment.deploy(baseMachine.asMaster());
deployment.deploy(baseMachine.asWorker());
javaApp.Deploy(deployment)
