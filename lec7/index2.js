let users = [
    {
        id: 1,
        name: "ritish",
        age: 24
    },

    {
        id: 2,
        name: "arsh",
        age: 17
    },
]

function isAllowed(id) {
    return new Promise((resolve , reject) =>{
        let user = null
        for(let i = 0; i<users.length; i++)
        {
            if(users[i].id == id)
            {
                user = users[i];
            }
        }

        if(!user) return reject("No user found");

        if(user.age<18) return reject("Age is less than 18");
        resolve("Allowed")
    })
}

isAllowed(1)
  .then((message) => {
    console.log(message); 
  })
  .catch((error) => {
    console.error(error);
  });

  isAllowed(2)
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error); 
  });