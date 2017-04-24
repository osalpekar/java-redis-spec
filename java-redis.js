
exports.Deploy = function(deployment) {
    
    var redis = require("github.com/quilt/redis");
    var rds = new redis.Redis(1, "AUTH_PASSWORD");
    rds.exclusive();

    var javaApp = new Container(new Image("java-redis-image",
      "FROM nginx\n" +
      "RUN cd /web_root && git clone github.com/osalpekar/java-redis-webapp"
    ))
    var jAppService = new Service("jApp", [javaApp]);

    deployment.deploy(rds);
    deployment.deploy(jAppService);
}
