pipeline {
    agent any

    tools {
        maven 'Maven3'
        jdk 'JDK17'
    }

    environment {
        FRONTEND_DIR = "mi-playlist-frontend"
        BACKEND_DIR = "MiPlaylist"
        ARTIFACT_NAME = "MiPlaylist-0.0.1-SNAPSHOT.jar"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Paulina-Goycoechea/entregable4'
            }
        }

        stage('Backend - Build Maven') {
            steps {
                dir("${BACKEND_DIR}") {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Backend - Run Tests') {
            steps {
                dir("${BACKEND_DIR}") {
                    bat 'mvn test'
                }
            }
        }

        stage('Frontend - Install Dependencies') {
            steps {
                dir("${FRONTEND_DIR}") {
                    bat 'npm install'
                }
            }
        }

        stage('Frontend - Build') {
            steps {
                dir("${FRONTEND_DIR}") {
                    bat 'npm run build'
                }
            }
        }

        stage('Package Deploy Folder') {
            steps {
                dir('.') {
                    // borrar carpeta deploy si existe
                    bat 'if exist deploy rmdir /S /Q deploy'
                    bat 'mkdir deploy'

                    // copiar frontend build
                    bat 'xcopy /E /I /Y "%FRONTEND_DIR%\\dist" "deploy\\frontend"'

                    // copiar backend jar
                    bat 'copy "%BACKEND_DIR%\\target\\%ARTIFACT_NAME%" "deploy\\backend.jar"'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo "Ejecutando scripts de deploy..."
                bat 'deploy-windows.bat'
            }
        }
    }
}
