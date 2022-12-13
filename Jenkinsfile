pipeline {
	agent any
	stages {
		stage('upload to S3'){
			steps{
				script{
					try{
						withAWS() {
							s3Upload(file:'Jenkinsfile', bucket:'osakabluesblog', path:'/')
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
