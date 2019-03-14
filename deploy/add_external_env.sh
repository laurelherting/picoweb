
#!/bin/bash

# https://github.com/aws-amplify/amplify-cli/blob/master/packages/amplify-cli/sample-headless-scripts/headless_add_external_env.sh
set -e
IFS='|'

AWSCLOUDFORMATIONCONFIG="{\
\"Region\": \"us-east-1\",\
\"DeploymentBucketName\": \"picoweb-20190304144110-deployment\",\
\"UnauthRoleName\": \"picoweb-20190304144110-unauthRole\",\
\"StackName\": \"picoweb-20190304144110\",\
\"StackId\": \"arn:aws:cloudformation:us-east-1:992563817568:stack/picoweb-20190304144110/39f51300-3ec6-11e9-a92d-0ed7a3d4fec0\",\
\"AuthRoleName\": \"picoweb-20190304144110-authRole\",\
\"UnauthRoleArn\": \"arn:aws:iam::992563817568:role/picoweb-20190304144110-unauthRole\",\
\"AuthRoleArn\": \"arn:aws:iam::992563817568:role/picoweb-20190304144110-authRole\"\
}"
PROVIDER_CONFIG="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"


AWS_CONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":true,\
\"profileName\":\"default\"\
}"

amplify env import \
--name master \
--config $PROVIDER_CONFIG \
--awsInfo $AWS_CONFIG \
--yes
