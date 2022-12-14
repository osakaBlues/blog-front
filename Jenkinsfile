def errorHendler(error) {
  print(error)
  env.cloneResult = false
  currentBuild.result = 'FAILURE'
}

pipeline {
  agent any
  tools {nodejs 'nodejs'}
  parameters {
    string(name: 'RESULT_NAME', defaultValue: 'result_name', description: 'output file name')
    string(name: 'RESULT_TYPE', defaultValue: 'tar', description: 'output file type')
    string(name: 'REGION', defaultValue: 'ap-northeast-1', description: 'aws region')
    string(name: 'APPLICATION_NAME', defaultValue: 'OsakaBluesblog', description: 'aws ec2 application name')
    string(name: 'BUCKET_NAME', defaultValue: 'osakabluesblog', description: 'aws bucket name')
    string(name: 'DEPLOYMENT_GROUP_NAME', defaultValue: 'blog-group', description: 'aws deploy group')
  }
  options {
    withAWS(credentials:'aws_key')
  }
  stages {
    stage('build'){
      steps{
        script{
          try{
            sh 'yarn install'
            sh 'yarn build'
           } catch(error){
            errorHendler(error)
          }
        }
      }
    }
    stage('zip files'){
      steps{
        script{
          try {
            sh 'tar  -cvf  ${params.RESULT_NAME}.${params.RESULT_TYPE} . > /dev/null'
          } catch (error) {
            errorHendler(error)
          }
        }
      }
    }
    stage('upload to S3'){
      steps{
        script{
          try{
            withAWS(region:'${params.REGION}') {
              s3Upload(
                file:'${params.RESULT_NAME}.${params.RESULT_TYPE}',
                bucket:'${params.BUCKET_NAME}',
                path:'${params.RESULT_NAME}.${params.RESULT_TYPE}')
            }
          } catch(error){
            errorHendler(error)
          }
        }
      }
    }
    stage('deploy to EC2'){
      steps{
        script{
          try{
            withAWS(region:'${params.REGION}') {
              createDeployment(
                applicationName: '${params.APPLICATION_NAME}',
                deploymentGroupName: '${params.DEPLOYMENT_GROUP_NAME}',
                deploymentConfigName: 'CodeDeployDefault.OneAtATime',
                description: 'test deploy to front',
                waitForCompletion: true,
                s3Bucket: '${params.BUCKET_NAME}',
                s3Key: '${params.RESULT_NAME}.${params.RESULT_TYPE}',
                s3BundleType: '${params.RESULT_TYPE}',
                fileExistsBehavior: 'OVERWRITE',
              )
            }
          } catch(error){
            errorHendler(error)
          }
        }
      }
    }
  }
}
