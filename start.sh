#!/bin/bash

# REPLACE ALL ENV.DEV BY EXAMPLE
cp -f docker-compose.example.yml docker-compose.yml
cp -f keycloak/docker-compose.example.yml keycloak/docker-compose.yml
cp -f nest-app/.env.example  nest-app/.env.dev
cp -f angular-app/src/environments/environment.example.ts  nest-app/.env.dev

IP=$(ip addr show eth0 | grep "inet\b" | awk '{print $2}' | sed 's/\/.*//')
echo "WSL IP: $IP"

echo "### Updating environment variables and docker compose settings"

echo "Updating in docker-compose.yml"
sed -i "s/<your-ip>/$IP/" docker-compose.yml

echo "Updating in keycloak/docker-compose.yml"
sed -i "s/<your-ip>/$IP/" keycloak/docker-compose.yml

echo "Updating in nest-app/.env.dev"
sed -i "s/<your-ip>/$IP/" nest-app/.env.dev

echo "Updating in angular-app/src/environments/environment.development.ts"
sed -i "s/<your-ip>/$IP/" angular-app/src/environments/environment.development.ts

cd keycloak && docker-compose up -d

echo "Waiting for setup of keycloak..."

echo "What is client secret? "
read CLIENT_SECRET


echo "Updating environments"

cd ..

echo "Updating in nest-app/.env.dev"
sed -i "s/<client-secret>/$CLIENT_SECRET/" nest-app/.env.dev

echo "Updating in docker-compose.yml"
sed -i "s/<client-secret>/$CLIENT_SECRET/" docker-compose.yml

docker-compose up -d

cd truffle-app

npm i

CONTRACT_ADDRESS=$(npx truffle deploy --network geth | grep 'OfficialStampContract' -A 4 | tail -n 1 | awk '{print $4}')

cp -f -r build/ ../nest-app/src/infrastructure/services/contract/

sed -i "s/<contract-address>/$CONTRACT_ADDRESS/" ../nest-app/.env.dev

cd .. && docker-compose up -d --no-deps --build nest-app