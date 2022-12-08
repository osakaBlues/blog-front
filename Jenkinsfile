pipeline {
    agent any

    stages {
        stage('docker down') {
            steps {
                echo 'docker compose down..'
                sh 'docker compose down'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying..'
                sh 'docker compose up -d'
            }
        }
    }
}