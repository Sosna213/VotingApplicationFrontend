pipeline {
    agent any
    tools {
        nodejs "nodejs"
    }
    stages {
        stage ('Install') {
            steps {
                sh "npm install"
            }
        }

        stage ('build') {
            steps {
                sh "npm run ng build"
            }
        }
    }
}
