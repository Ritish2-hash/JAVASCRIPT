const fs = require("fs");

fs.readFile("./data.txt", "utf8", function(err, data1) {
    if (err) return console.log("Error", err);
    console.log("Done");

    fs.readFile("./demo.txt", "utf8", function(err, data2) {
        if (err) return console.log("Error reading demo.txt:", err);
        console.log("demo.txt read successfully");

        let combinedData = data1 + "\n" + data2;

        fs.writeFile("./result.txt", combinedData, function(err) {
            if (err) return console.log("Error writing result.txt:", err);
            console.log("Data from both files written to result.txt");
        });
    });
});

