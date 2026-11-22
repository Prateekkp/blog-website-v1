pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = 'doc110010/blog-app'
        IMAGE_TAG       = "${BUILD_NUMBER}"
        KUBECONFIG      = '/var/jenkins_home/.kube/config'
    }

    stages {
        stage('Checkout SCM') {
            steps {
                echo 'Checking out code from Git...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image: ${DOCKER_HUB_REPO}:${IMAGE_TAG} & latest..."
                sh """
                    docker build -t ${DOCKER_HUB_REPO}:${IMAGE_TAG} -t ${DOCKER_HUB_REPO}:latest .
                """
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo "Pushing images to Docker Hub..."
                sh """
                    docker push ${DOCKER_HUB_REPO}:${IMAGE_TAG}
                    docker push ${DOCKER_HUB_REPO}:latest
                """
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Applying Kubernetes manifests...'
                sh """
                    kubectl apply -f k8s/deployment.yaml
                    kubectl apply -f k8s/service.yaml
                    kubectl set image deployment/blog-deployment blog-app=${DOCKER_HUB_REPO}:${IMAGE_TAG}
                    kubectl rollout status deployment/blog-deployment --timeout=90s
                """
            }
        }

        stage('Verify Status') {
            steps {
                echo 'Checking Kubernetes Pods and Services...'
                sh """
                    kubectl get pods -l app=blog-app -o wide
                    kubectl get service blog-service
                """
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeded! Application is live at http://localhost:30080"
        }
        failure {
            echo "Pipeline failed. Review the logs above for diagnostic details."
        }
    }
}
