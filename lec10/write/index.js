const fs = require('fs');


let user = [
    {
        id: 1,
        name: "John",
        email: "john1234@gmail.com",
        address: "delhi",
        password: "1234"
    },
    {
        id: 2,
        name: "nitesh",
        email: "nitesh1234@gmail.com",
        address: "faridbad",
        password: "12345"
    }
];


const data = JSON.stringify(user, null, 2); 


fs.writeFile('users.json', data, (err) => {
    if (err) {
        console.error("Error writing file:", err);
    } else {
        console.log("User data successfully written to users.json");
    }
});




