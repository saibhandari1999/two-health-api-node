# two-health-api-node
Software engineering internship at Truffle Health Backend

Steps to run 
1. get pull from git
2. on root directory run "npm install"
3. to run the app "node .\server.js"
4. to run the test cases "npm test"
5. to check api working use postman 
    1. GET    http://localhost:3000/items
    2. POST   http://localhost:3000/items
            data(JSON):   {
                            "patientName": "sss",
                            "patientAddress": "xyz",
                            "hospitalname": "pqr",
                            "dateOfService": "12-07-2023",
                            "billAmount": 200
                          }