def errorHendler(error) {
  print(error)
  env.cloneResult = false
  currentBuild.result = 'FAILURE'
}

pipeline {
  agent any
  tools {nodejs 'nodejs'}
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
            return
          }
        }
      }
    }
    stage('zip files'){
      steps{
        script{
          try {
            sh "rm *.${RESULT_TYPE}"
            sh "tar  -cf  ${RESULT_NAME}.${RESULT_TYPE} ."
          } catch (error) {
            errorHendler(error)
            return
          }
        }
      }
    }
    stage('upload to S3'){
      steps{
        script{
          try{
            withAWS(region:"${REGION}") {
              s3Upload(
                file:"${RESULT_NAME}.${RESULT_TYPE}",
                bucket:"${BUCKET_NAME}",
                path:"${RESULT_NAME}.${RESULT_TYPE}")
            }
          } catch(error){
            errorHendler(error)
            return
          }
        }
      }
    }
    stage('deploy to EC2'){
      steps{
        script{
          try{
            withAWS(region:"${REGION}") {
              createDeployment(
                applicationName: "${APPLICATION_NAME}",
                deploymentGroupName: "${DEPLOYMENT_GROUP_NAME}",
                deploymentConfigName: 'CodeDeployDefault.OneAtATime',
                description: 'test deploy to front',
                waitForCompletion: true,
                s3Bucket: "${BUCKET_NAME}",
                s3Key: "${RESULT_NAME}.${RESULT_TYPE}",
                s3BundleType: "${RESULT_TYPE}",
                fileExistsBehavior: 'OVERWRITE',
              )
            }
          } catch(error){
            errorHendler(error)
            return
          }
        }
      }
    }
  }
}
