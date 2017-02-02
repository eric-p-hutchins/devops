const AWS = require('aws-sdk')
const awsImageId = 'ami-0b33d91d'
const awsSecurityGroupIds = 'sg-a86ad7d4'
const awsKeyName = 'eph-key-pair'
const awsInstanceType = 't2.micro'
const exec = require('child_process').exec

function startInstance() {
  // Generate a random number in the range 0 - 9999
  const dockerContainerIds = Math.floor(Math.random() * 10000)

  var ec2 = new AWS.EC2()
  var params = {
    ImageId: awsImageId,
    SecurityGroupIds: [awsSecurityGroupIds],
    MinCount: 1,
    MaxCount: 1,
    InstanceType: awsInstanceType,
    KeyName: awsKeyName,
    UserData: dockerContainerIds.toString()
  }
  ec2.runInstances(params, (err, data) => {
    if (err) {
      return console.log('Error starting instance', err, err.stack)
    } else {
      console.log(data)
    }
  })
}

module.exports.startInstance = startInstance
