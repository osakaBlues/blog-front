pipeline {
	agent any
	stages {
		stage('build'){
			steps{
				script{
					try{
						sh 'yarn install'
						sh 'yarn build'
	 				} catch(error){
						print(error)
						env.cloneResult = false
						currentBuild.result = 'FAILURE'
					}
				}
			}
		}
		stage('upload to S3'){
			steps{
				script{
					try{
						withAWS(region:'ap-northeast-1') {
							s3Upload(file:'*', bucket:'osakabluesblog', path:'/')
						}
					} catch(error){
						print(error)
						env.cloneResult = false
						currentBuild.result = 'FAILURE'
					}
				}
			}
		}
	}
}
