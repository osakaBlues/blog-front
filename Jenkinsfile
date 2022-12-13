pipeline {
	agent any
	stages {
		stage('upload to S3'){
			steps{
				script{
					try{
						WithAWS() {
							sh 'aws s3 cp ${RESULT_NAME}.zip ${S3_DESTNATION}'
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
