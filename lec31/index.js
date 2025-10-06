const { PrismaClient } = require('./generated/prisma'); 
const prisma = new PrismaClient();

function addUser(name, email) {
  return prisma.user.create({
    data: { name, email }
  });
}

addUser("Ritish", "garg47688@gmail.com")
  .then(user => console.log("User created:", user))
  .catch(err => console.error("Error creating user:", err))
  .finally(() => prisma.$disconnect());

async function addTweet(userId, body, image = null) {
  try {
    // check if user exists
    let userExist = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!userExist) {
      return JSON.stringify({
        success: false,
        message: "User does not exist"
      });
    }

    if (!body && !image) {
      return JSON.stringify({
        success: false,
        message: "Tweet cannot be empty"
      });
    }

    // create tweet
    let newTweet = await prisma.tweet.create({
      data: {
        userid: userId,
        body: body,
        image: image
      }
    });

    return JSON.stringify({
      success: true,
      message: "Tweet added successfully",
      data: newTweet
    });
  } catch (error) {
    return JSON.stringify({
      message: "Error adding tweet",
    });
  }
}

// call function
addTweet(1, "my first tweet", null) // <-- 1 is now a number, not a string
  .then((data) => console.log(data))
  .catch((e) => console.log(e));


async function updateTweet(tweetId, body, image = null) {
  try {
    const tweetExist = await prisma.tweet.findUnique({
      where: { id: tweetId }
    });

    if (!tweetExist) {
      return JSON.stringify({
        success: false,
        message: "Tweet not found"
      });
    }

    const updatedTweet = await prisma.tweet.update({
      where: { id: tweetId },
      data: { body, image }
    });

    return JSON.stringify({
      success: true,
      message: "Tweet updated successfully",
      data: updatedTweet
    });

  } catch (error) {
    return JSON.stringify({
      success: false,
      message: "Error updating tweet",
      error: error.message
    });
  }
}
async function readTweets(){
  let alltweets= await prisma.tweet.findMany({
    select:{
      user:true
    }
  });
  return alltweets;
}
readTweets()
.then((data)=>{
  console.log(data)
})
.catch()