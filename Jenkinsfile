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
					}
				}
			}
		}
		stage('zip files'){
			steps{
				script{
					try {
						sh 'tar  -cvf  front.tar .'
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
						withAWS(region:'ap-northeast-1') {
							s3Upload(file:'front.tar', bucket:'osakabluesblog', path:'front.tar')
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
            withAWS(region:'ap-northeast-1') {
              createDeployment(
                applicationName: 'OsakaBluesblog',
                deploymentGroupName: 'blog-group',
                deploymentConfigName: 'CodeDeployDefault.OneAtATime',
                description: 'test deploy to front',
                waitForCompletion: true,
                s3Bucket: 'osakabluesblog',
                s3Key: 'front.tar',
                s3BundleType: 'tar',
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
