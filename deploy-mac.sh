#!/bin/bash

echo "==============================="
echo "   Ejecutando deploy en Mac/Linux"
echo "==============================="

# Carpeta destino del deploy
DESTINATION="/Users/Shared/deploy-entregable4"

echo "Creando carpeta de destino si no existe..."
mkdir -p "$DESTINATION"

echo "Copiando frontend..."
cp -R deploy/frontend "$DESTINATION/frontend"

echo "Copiando backend..."
cp deploy/backend.jar "$DESTINATION/backend.jar"

echo "--------------------------------"
echo "   Deploy completado con éxito!"
echo "--------------------------------"
