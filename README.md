# Official Stamps Application

#### Ethereum Network / Smart Contracts / Keycloak / Nestjs / Angular

## Requirements

-   WSL / Linux
-   Git
-   SSH keys
-   Docker

### Setup

**1. Git clone:**

```bash
  git clone git@github.com:gbdecastro/official-stamps-api.git
```

**2. Go to project folder**

```bash
  cd official-stamps-api
```

**NOTES:**

_Using WSL you must add the WSL IP in **hosts** windows file combining with **official-stamps** dns, it needs because of the keycloak server_.

-   **First**: Get WSL IP

```bash
  ip addr show eth0 | grep "inet\b" | awk '{print $2}' | cut -d/ -f1
  <your-wsl-ip>
```

-   **Second**: You must update the Enviroments using your WSL IP directly in the files

    > **_docker-compose.yml_** search by **_<your-wsl-ip>_** and replace for the ip presented in the first step.

    > **_.env.dev in nest-app/_** search by **_<your-wsl-ip>_** and replace for the ip presented in the first step.

    > **_.enviroment.development.ts in angular-app/_** search by **_<your-wsl-ip>_** and replace for the ip presented in the first step

**3. Run Docker Compose**

```bash
  docker-compose up -d
```

#### Wait for:

```bash
⠿ Network official-stamps-api_default              Created
⠿ Volume "official-stamps-api_keycloak-db-volume"  Created
⠿ Volume "official-stamps-api_postgres-volume"     Created
⠿ Container postgres-db                            Started
⠿ Container ethereum-network                       Started
⠿ Container keycloak-db                            Started
⠿ Container official-stamps-api-keycloak-1         Started
⠿ Container nest-app                               Started
⠿ Container angular-app                            Started
```

**4. Setup Keycloak**

-   Go to [http://official-stamps:8080/admin/master/console/#/official-stamps-portal](http://official-stamps:8080/admin/master/console/#/official-stamps-portal)
-   Username: **admin** / Password: **admin**
-   Access Clients
    > -   Search by **official-stamps-api**
    > -   Go to Credentials tab
    > -   Click on Save
    > -   Regenerate Client Secret
    > -   Refresh page
    > -   Copy client secret **_you need it in the next step_**
-   Create a new User
    > -   Go to Users page
    > -   Click on Add User
    > -   Fill username, email, name and last name
    > -   Save
    > -   Assing admin Role
    > -   Refresh page to confirm

**5. Update Enviroments on Nestjs**

-   Open the .env.dev and replace **<client-secret>** by the client secret generated in the previous step

```bash
KEYCLOAK_CLIENT_SECRET=<client-secret>
```

-   Rebuild Container

```bash
docker-compose up -d --no-deps --build nest-app
```

## Links

**Keycloak** [http://your-wsl-ip:8080](http://your-wsl-ip:8080)

**Nestjs App** [http://your-wsl-ip:3000/api](http://your-wsl-ip:3000/api)

**Angular App** [http://your-wsl-ip:4200](http://your-wsl-ip:4200)
