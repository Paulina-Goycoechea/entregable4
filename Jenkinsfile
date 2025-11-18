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
        //Clona tu repositorio GitHub
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Paulina-Goycoechea/entregable4'
            }
        }

        /*Entra a la carpeta del backend y ejecuta maven: limpia el proyecto(clean),
        compila y empaqueta(package), genera el .jar*/
        stage('Backend - Build Maven') {
            steps {
                dir("${BACKEND_DIR}") {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        /*Ejecuta los tests de JUnit. Si algún test falla → Jenkins detiene el pipeline.*/
        stage('Backend - Run Tests') {
            steps {
                dir("${BACKEND_DIR}") {
                    bat 'mvn test'
                }
            }
        }

        /*Entra al proyecto React. Instala dependencias usando npm install.*/
        stage('Frontend - Install Dependencies') {
            steps {
                dir("${FRONTEND_DIR}") {
                    bat 'npm install'
                }
            }
        }

        /*Genera la carpeta dist con el frontend optimizado para producción.*/
        stage('Frontend - Build') {
            steps {
                dir("${FRONTEND_DIR}") {
                    bat 'npm run build'
                }
            }
        }

        /*Crea C:deploy-entregable4: deploy/frontend + deploy/backend.jar*/
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

        /*Ejecuta el script deploy-windows.bat*/
        stage('Deploy') {
            steps {
                echo "Ejecutando scripts de deploy..."
                bat 'deploy-windows.bat'
            }
        }
    }
}
