@echo off
echo ===============================
echo   Ejecutando deploy en Windows
echo ===============================

REM Carpeta destino del deploy
SET DESTINATION=C:\deploy-entregable4

echo Creando carpeta destino si no existe...
IF NOT EXIST "%DESTINATION%" (
    mkdir "%DESTINATION%"
)

echo Copiando archivos del frontend...
xcopy /E /I /Y "deploy\frontend" "%DESTINATION%\frontend"

echo Copiando backend jar...
copy /Y "deploy\backend.jar" "%DESTINATION%\backend.jar"

echo --------------------------------
echo     Deploy completado con éxito!
echo --------------------------------
