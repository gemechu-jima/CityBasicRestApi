pipeline {
    agent any

    environment {
        // Use single quotes where interpolation isn't needed
        IMAGE = 'docker.io/onetwo1/citybasicrestapi'   
        TAG   = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                // Simplified checkout
                git branch: 'main', url: 'https://github.com/gemechu-jima/CityBasicRestApi.git'
            }
        }

        stage('Build') {
            steps {
                // Using double quotes so the shell can read the Jenkins env variables
                sh 'docker build -t "$IMAGE:$TAG" -t "$IMAGE:latest" .'
            }
        }

        stage('Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-id', 
                    passwordVariable: 'DOCKERHUB_PWD',
                    usernameVariable: 'DOCKERHUB_USER'
                )]) {
                    sh 'echo "$DOCKERHUB_PWD" | docker login -u "$DOCKERHUB_USER" --password-stdin'
                    sh 'docker push "$IMAGE:$TAG"'
                    sh 'docker push "$IMAGE:latest"'
                }
            }
        }

        stage('Deploy') {
            steps {
                // Added a check to see if container exists before trying to stop it
                sh '''
                    docker pull "$IMAGE:$TAG"
                    docker stop citybasicrestapi || true
                    docker rm citybasicrestapi || true
                    docker run -d --name citybasicrestapi -p 4000:4000 "$IMAGE:$TAG"
                '''
            }
        }

        stage('Test') {
            steps {
                sh 'sleep 10'
                // This runs a curl command from a temporary container on the host network
                sh 'docker run --rm --network host curlimages/curl -f http://localhost:4000'
            }
        }
    }

    post {
        always {
            // Clean up the workspace and local docker images to save space
            cleanWs()
            sh 'docker rmi "$IMAGE:$TAG" "$IMAGE:latest" || true'
        }
    }
}