pipeline {
    agent any
   triggers {
        pollSCM('* * * * *') 
    }
    stages {
        stage('Build') {
             agent {
                docker {
                 image 'node:18-alpine'
                 reuseNode true
            }
        }
            steps {
                sh '''
                node --version
                npm --version
                npm install
                npm run build
                '''
            }
        }
        stage("Test"){
            agent {
              docker {
                image 'node:18-alpine'
                reuseNode true
            }
           }
            steps{
                sh '''
                ls -la dist/ || echo "No dist folder found"
                npm run test
                '''
            }
        }
        stage("Deploy"){
            agent {
              docker {
                image 'node:18-alpine'
                reuseNode true
            }
           }
            steps{
                sh '''
                echo "deploy"
                '''
            }
        }
    }
}
