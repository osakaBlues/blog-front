pipeline {
	agent any
	stages {
		stage('delete origin zip file') {
			steps {
				script {
					try {
						sh 'rm -rf ${RESULT_NAME}.zip'
					} catch(error){
						print(error)
						env.cloneResult = false
						currentBuild.result = 'FAILURE'
					}
				}
			}
		}
		stage('make zip file'){
			steps{
			script{
				try{
					sh 'zip -r ${RESULT_NAME}.zip .'
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
						sh 'aws s3 cp ${RESULT_NAME}.zip ${S3_DESTNATION}'
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
