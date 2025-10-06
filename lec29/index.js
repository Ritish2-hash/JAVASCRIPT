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
