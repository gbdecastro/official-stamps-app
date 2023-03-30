# Official Stamps Application

#### Ethereum Network / Smart Contracts / Keycloak / Nestjs / Angular

## Requirements

- WSL / Linux
- Git
- SSH keys
- Docker

### Setup

**1. Git clone:**

```bash
  git clone git@github.com:gbdecastro/official-stamps-api.git
```

**2. Go to project folder**

```bash
  cd official-stamps-app
```

**3. Start Project**

```bash
  sudo chmod +x ./start.sh && ./start.sh
```
**4. Setup Keycloak**
_When the message [**"Waiting for setup of keycloak..."**] in prompt was presented_:

- Go to Keycloak [http://`<your-ip>`:8080/admin/master/console/#/official-stamps-portal](http://`<your-ip>`:8080/admin/master/console/#/official-stamps-portal)
- Username: **admin** / Password: **admin**
- Access Clients
  > - Search by **official-stamps-api**
  > - Go to Credentials tab
  > - Click on Save
  > - Regenerate Client Secret
  > - Refresh page
  > - Copy client secret **_you will be used it in the next step_**
- Create a new User
  > - Go to Users page
  > - Click on Add User
  > - Fill username, email, name and last name
  > - Save
  > - Assing admin Role
  > - Refresh page to confirm

**6. Paste the Client Secret in Prompt**

```bash
What is client secret?
<client-secret> # Paste here
```

## Wait for everything!!

## Links

**Keycloak** [http://`your-ip`:8080](http://your-ip:8080)

**Nestjs App** [http://`your-ip`:3000/api](http://your-ip:3000/api)

**Angular App** [http://`your-ip`:4200](http://your-ip:4200)
