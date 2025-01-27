#CheckTheBoard

Versions
Node - 22.13.1

Bootstrap 5.3.3
Angular 18.0.5
Angular Material: 18.2.14

Database
MongoDB
GitClone
git clone https://github.com/checktheboard.git .

Installation
Steps to setup project on the local system

Create two folders i.e frontend and backend

cd frontend

git clone https://github.com/checktheboard.git .

git checkout dev_frontend

cd backend

git clone https://github.com/checktheboard.git .

git checkout dev_backend

#Install node module packages in both folders. command to install the node module

npm install or yarn install
#To start a project, run yarn start command inside both folders.

Branch Names

Development
dev_frontend
dev_backend

Staging
staging_frontend
staging_backend

Production
prod_frontend
prod_backend

Deployment Project on servers,
sudo su
cd checktheboard
git pull origin dev_backend | staging_backend | prod_backend (Based on the servers)
pm2 restart all