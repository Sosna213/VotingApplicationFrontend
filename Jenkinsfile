pipeline{
  agent any

  tools {nodejs "nodejs"}
  stage('Install node modules'){
    sh "npm install"
  }
  stage('Build'){
    sh "ng serve"
  }
}
