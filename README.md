# CoV-Connect

Stack: MERN

Website: <href src="covconnect.live">covconnect.live</href>

Steps to run the application:

1. Install node

        wget https://nodejs.org/dist/v12.16.2/node-v12.16.2-linux-x64.tar.xz
        mkdir -p /usr/local/lib/nodejs
        tar -xJvf node-v12.16.2-linux-x64.tar.xz -C /usr/local/lib/nodejs/

    Add the following line to ~/.profile
        
        export PATH=/usr/local/lib/nodejs/node-v12.16.2-linux-x64/bin:$PATH

    Refresh profile

        . ~/.profile

2. Install MongoDB
    
        apt install mongodb
        systemctl start mongodb

3. Create a database and user for the application to use.

    Run the following on the mongo prompt.
    
        > mongo
            use covconnect
            db.createUser({user: "covconnectUser", pwd: "<mongodb_password>", roles: [{ role: "readWrite", db: "covconnect" }]})
            
    Note: Use a UUID as password.<br/>
    UUID can be generated by running 'cat /proc/sys/kernel/random/uuid'

4. Setting up the repository

        git clone https://github.com/covconnect/CoV-Connect.git covconnect
        cd covconnect/repo
        sudo npm install
        cd src/backend
        sudo npm install
        cd ../frontend
        sudo npm install

5. Set environment variables with all the details regarding the mongodb credentials and the JWT secret.


        MONGODB_HOST --> Hostname for MongoDB. [ Default: localhost ]
        MONGODB_PORT --> Port number for MongoDB. [ Default: 27017 ]
        MONGODB_NAME --> Name of the database. [ Default: covconnect ]
        MONGODB_USER --> Username for the database. [ Default: covconnectUser ]
        MONGODB_PASSWORD --> Password for the database. [ Mandatory ]
        SERVER_HOST --> Hostname or IP for the server to run on. [ Default: localhost ]
        SERVER_PORT --> Port number for the server to run on. [ Default: 8080 ]
        JWT_SECRET --> Secret for json web tokens. [ Mandatory ]                                                   
    
    Note: Use a UUID for JWT secret as well.

6. Start the application.

        npm start
        
    Note: start the application from the base directory of the repository to run both the server and react application.