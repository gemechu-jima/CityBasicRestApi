pipeline {
  agent any

  environment {
    IMAGE = 'docker.io/onetwo1/citybasicrestapi'   
    TAG   = "${BUILD_NUMBER}"
  }

  stages {
    stage('checkout') {
      steps {
       git branch: 'main',
       poll: false, 
       url: 'https://github.com/gemechu-jima/CityBasicRestApi.git'
      }
    }
    stage('build') {
      steps {
       sh 'docker build -t "$IMAGE:$TAG" -t "$IMAGE:latest" .'
      }
    }
    stage('push') {
      steps {
        withCredentials([usernamePassword(
            credentialsId: 'docker-hub-id', 
            passwordVariable: 'DOCKERHUB_PWD',
            usernameVariable: 'DOCKERHUB_USER'
            )]) 
        {
          sh 'echo "$DOCKERHUB_PWD" | docker login -u "$DOCKERHUB_USER" --password-stdin'
          sh 'docker push "$IMAGE:$TAG"'
          sh 'docker push "$IMAGE:latest"'
      }
    }
    stage('deploy') {
      steps {
         sh 'docker pull "$IMAGE:$TAG"'
        sh 'docker rm -f citybasicrestapi || true'
        sh 'docker run -d --name citybasicrestapi -p 4000:4000 "$IMAGE:$TAG"'
      }
    }
    stage('test') {
      steps {
        sh 'sleep 2; curl -s http://localhost:4000 || true'
      }
    }
  }
}