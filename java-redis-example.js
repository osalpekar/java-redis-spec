var redis = require("github.com/quilt/redis");

// var javaApp = new Container(new Image("java-redis-image",
//   "FROM nginx\n" +
//   "RUN cd /web_root && git clone github.com/osalpekar/java-redis-webapp"
// ))

var javaApp = new Container("osalpekar/test-nginx");

var namespace = createDeployment({});

var rds = new redis.Redis(1, "AUTH_PASSWORD");
rds.exclusive();
var jAppService = new Service("jApp", [javaApp]);


publicInternet.connect(80, jAppService);
jAppService.connect(80, publicInternet);
jAppService.connect(443, publicInternet);
jAppService.connect(53, publicInternet);
jAppService.connect(8080, publicInternet);
jAppService.connect(8081, publicInternet);
jAppService.connect(4040, publicInternet);

publicInternet.connect(8080, jAppService);
publicInternet.connect(8081, jAppService);
publicInternet.connect(80, jAppService);
publicInternet.connect(53, jAppService);
publicInternet.connect(443, jAppService);
publicInternet.connect(4040, jAppService);

var baseMachine = new Machine({
    provider: "Amazon",
    cpu: new Range(1),
    ram: new Range(2),
    sshKeys: githubKeys("osalpekar"),
});

namespace.deploy(baseMachine.asMaster());
namespace.deploy(baseMachine.asWorker().replicate(4));

namespace.deploy(rds);
namespace.deploy(jAppService);


// var javaApp = require("github.com/osalpekar/java-redis-spec");
// var deployment = createDeployment();
// var baseMachine = new Machine({
//     provider: "Amazon", 
//     sshKeys: githubKeys("osalpekar"),
// });
// deployment.deploy(baseMachine.asMaster());
// deployment.deploy(baseMachine.asWorker());
// javaApp.Deploy(deployment)
