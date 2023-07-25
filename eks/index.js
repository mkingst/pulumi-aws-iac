"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const awsx = require("@pulumi/awsx");
const eks = require("@pulumi/eks");

const vpc = new awsx.ec2.Vpc("vpc", {
	cidrBlock: "10.0.0.0/16"
})

const cluster = new eks.Cluster("cluster", {
    vpcId: vpc.id,
    instanceType: "t2.medium",
    subnetIds: vpc.publicSubnetIds,
    desiredCapacity: 2,
    minSize: 1,
    maxSize: 2,
});

exports.kubeconfig = cluster.kubeconfig
