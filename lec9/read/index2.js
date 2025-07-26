const fs = require("fs");


fs.readFile("./users.json", "utf8", function (err, data1) {
    if (err) return console.log("Error reading users.json:", err);


    fs.readFile("./extraUsers.json", "utf8", function (err, data2) {
        if (err) return console.log("Error reading extraUsers.json:", err);

        try {
          
            const users1 = JSON.parse(data1);
            const users2 = JSON.parse(data2);

            
            const allUsers = users1.concat(users2);

          
            fs.writeFile("./allUsers.json", JSON.stringify(allUsers, null, 2), function (err) {
                if (err) return console.log("Error writing allUsers.json:", err);
                console.log("Successfully merged and written to allUsers.json");
            });

        } catch (parseErr) {
            console.log("Error parsing JSON files:", parseErr);
        }
    });
});
