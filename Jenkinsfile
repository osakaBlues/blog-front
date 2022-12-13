pipeline {
	agent any
		stage('upload to S3'){
			steps{
				script{
					try{
						sh 'aws s3 cp Jenkinsfile ${S3_DESTNATION}'
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
