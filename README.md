# Page Router Template

This project is a Next.js application using the Page Router. It includes basic authentication (login/signup) and a dashboard.

## Setup Instructions

To set up the project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/Page-Router-Template.git
    cd Page-Router-Template
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root directory and add the following:

    ```
    MONGODB_URI=your_mongodb_connection_string
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_nextauth_secret
    ```

    -   `MONGODB_URI`: Your MongoDB connection string.
    -   `NEXTAUTH_URL`: The URL of your application. For local development, it's `http://localhost:3000`.
    -   `NEXTAUTH_SECRET`: A secret string used to sign and encrypt the NextAuth.js session cookie. You can generate a strong secret using `openssl rand -base64 32` in your terminal.

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This section outlines how to deploy your Next.js application to a custom server using a GitHub Actions workflow that leverages SSH and PM2.

### Prerequisites

Before you begin, ensure you have:

1.  A remote server (e.g., a VPS) with SSH access.
2.  Node.js and npm installed on your server (the deployment script will attempt to install them).
3.  `pm2` installed globally on your server (the deployment script will attempt to install it).
4.  Your project hosted on a Git repository (e.g., GitHub).

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)

The deployment is automated via a GitHub Actions workflow. When changes are pushed to the `main` branch or a pull request is merged into `main`, the workflow will:

1.  Connect to your server via SSH.
2.  Clone or pull the latest changes from your repository.
3.  Install/update Node.js, npm, and PM2 on the server.
4.  Install project dependencies.
5.  Build the Next.js application.
6.  Start or restart the application using PM2, ensuring it runs automatically.
7.  Save the PM2 process list to ensure the application restarts after server reboots.

### Configure GitHub Secrets

For the GitHub Actions workflow to function correctly, you need to set up several secrets in your GitHub repository. Go to your repository settings -> `Secrets and variables` -> `Actions` and add the following:

*   **`SERVER_HOST`**: The IP address or hostname of your deployment server.
*   **`SERVER_USER`**: The SSH username for logging into your server.
*   **`SERVER_SSH_KEY`**: Your private SSH key. Generate an SSH key pair on your local machine if you don't have one (`ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`). Ensure you add the public key to your server's `~/.ssh/authorized_keys` file. You can also use the text content of a `.pem` key file.
*   **`APPS_FOLDER`**: The base directory on your server where your applications are stored (e.g., `/home/ubuntu/apps`).
*   **`APP_NAME`**: The name of your application, which will be used as the folder name on the server and the PM2 process name (e.g., `my-nextjs-app`).
*   **`REPO_URL`**: The full Git URL of your repository (e.g., `https://github.com/your-username/Page-Router-Template.git`).
*   **`PORT`**: The port number on which your Next.js application will run on the server (e.g., `3000`).

### Manual Deployment (for initial setup or troubleshooting)

While the GitHub Action automates deployment, you might need to perform a manual deployment initially or for troubleshooting.

1.  **SSH into your server:**
    ```bash
    ssh your_username@your_server_host
    ```

2.  **Navigate to the applications folder:**
    ```bash
    cd /path/to/your/apps/folder # Replace with your APPS_FOLDER
    ```

3.  **Clone the repository (if not already cloned by the action):**
    ```bash
    git clone https://github.com/your-username/Page-Router-Template.git your_app_name # Replace with your REPO_URL and APP_NAME
    cd your_app_name
    ```

4.  **Install Node.js and npm (if not already present):**
    ```bash
    sudo apt update
    sudo apt install -y nodejs npm
    ```

5.  **Install PM2 globally:**
    ```bash
    sudo npm install -g pm2
    ```

6.  **Install project dependencies:**
    ```bash
    npm install
    ```

7.  **Build the Next.js application:**
    ```bash
    npm run build
    ```

8.  **Start the application with PM2:**
    ```bash
    pm2 start npm --name "your_app_name" -- run start -- -p your_port # Replace with your APP_NAME and PORT
    ```

9.  **Save PM2 process list to ensure it restarts on reboot:**
    ```bash
    pm2 save
    ```

10. **Check PM2 status:**
    ```bash
    pm2 list
    ```

After these steps, your Next.js application should be running on the specified port on your server. Ensure that your server's firewall rules allow traffic on that port.
