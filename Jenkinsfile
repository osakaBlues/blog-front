pipeline {
	agent any
	stages {
		stage('upload to S3'){
			steps{
				script{
					try{
						withAWS(region:'ap-northeast-1') {
							s3Upload(file:'Jenkinsfile', bucket:'osakabluesblog', path:'test')
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
