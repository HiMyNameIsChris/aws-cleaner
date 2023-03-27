import { ResourceType } from "./ResourceType.js";

export type ResourceTypeDependencies = Record<ResourceType, ResourceType[]>;

export const resourceTypeDependencies: ResourceTypeDependencies = {
  "ec2.elastic-ip": ["ec2.vpc"],
  "ec2.internet-gateway": ["ec2.elastic-ip"],
  "ec2.natgateway": ["ec2.subnet"],
  "ec2.route-table": ["ec2.vpc"],
  "ec2.security-group": ["ec2.vpc"],
  "ec2.security-group-rules": ["ec2.security-group"],
  "ec2.subnet": ["ec2.vpc"],
  "ec2.vpc-flow-log": ["logs.log-group"],
  "ec2.vpc": [],
  "ecr.repository": [],
  "ecs.cluster": [],
  "ecs.service": [
    "ec2.elastic-ip",
    "ec2.internet-gateway",
    "ec2.security-group",
    "ec2.subnet",
    "ecs.cluster",
    "ecs.task",
    "ecs.task-definition",
  ],
  "ecs.task": [
    "ec2.elastic-ip",
    "ec2.internet-gateway",
    "ec2.security-group",
    "ec2.subnet",
    "ecs.cluster",
    "ecs.task-definition",
  ],
  "ecs.task-definition": ["ecs.task-definition-family", "iam.role", "logs.log-group"],
  "ecs.task-definition-family": [],
  "elasticache.cluster": ["ec2.internet-gateway", "ec2.security-group", "elasticache.subnetgroup"],
  "elasticache.subnetgroup": ["ec2.subnet"],
  "elasticloadbalancing.listener-rule": ["elasticloadbalancing.listener"],
  "elasticloadbalancing.listener": ["elasticloadbalancing.loadbalancer", "elasticloadbalancing.targetgroup"],
  "elasticloadbalancing.loadbalancer": [
    "ec2.elastic-ip",
    "ec2.internet-gateway",
    "ec2.security-group",
    "ec2.subnet",
    "s3",
  ],
  "elasticloadbalancing.targetgroup": ["ec2.vpc"],
  "firehose.deliverystream": [],
  "iam.instance-profile": ["iam.role"],
  "iam.policy": [],
  "iam.role": ["iam.policy"],
  "logs.log-group": [],
  "rds.cluster-pg": [],
  "rds.cluster-snapshot": [],
  "rds.cluster": [
    "ec2.internet-gateway",
    "ec2.security-group",
    "iam.role",
    "logs.log-group",
    "rds.cluster-pg",
    "rds.cluster-snapshot",
    "rds.subgrp",
  ],
  "rds.db": ["ec2.internet-gateway", "ec2.security-group", "logs.log-group", "rds.cluster", "rds.subgrp"],
  "rds.subgrp": ["ec2.subnet"],
  s3: ["iam.policy"],
  "secretsmanager.secret": [],
  "servicediscovery.namespace": [],
  "servicediscovery.service": ["servicediscovery.namespace"],
};
