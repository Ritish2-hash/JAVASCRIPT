const { myread, mywrite } = require("./io");

async function task() {
  try {
    let data1 = await myread("./read/users.json");
    let data2 = await myread("./read/allUsers.json");

    
    let res = [...data1, ...data2];

  
    let message = await mywrite("./res.txt", res); 
    console.log(message); 

  } catch (error) {
   
    console.log("An error occurred:", error);
  }
}


task();