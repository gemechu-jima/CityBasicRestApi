pipeline {
    agent any

    stages {
        agent {
            docker {
                image 'node:18-alpine'
                reuseNode true
            }
        }
        stage('buil') {
            steps {
                sh '''
                ls la
                node --version
                npm --version
                npm cli
                npm run build
                ls la
                '''
            }
        }
    }
}
