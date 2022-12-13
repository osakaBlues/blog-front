def errorHendler(error) {
	print(error)
	env.cloneResult = false
	currentBuild.result = 'FAILURE'
}

pipeline {
	agent any
	tools {nodejs 'nodejs'}
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
							s3Upload(file:'front.tar', bucket:'osakabluesblog', path:'result.tar')
						}
					} catch(error){
						errorHendler(error)
					}
				}
			}
		}
	}
}
