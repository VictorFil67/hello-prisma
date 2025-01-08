import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import "dotenv/config";
import usersRouter from "./routes/usersRouter";

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

const { PORT = 3000 } = process.env;

app.use("/users", usersRouter);

// async function main() {
//   // ... you will write your Prisma Client queries here
//   const allUsers = await prisma.user.findMany();
//   console.log(allUsers);
// }
// async function main() {
//   const user = await prisma.user.create({
//     data: {
//       name: "Victor",
//       email: "victor@prisma.io",
//       posts: {
//         create: { title: "Hello World from Peter" },
//       },
//       profile: {
//         create: { bio: "I like bikes" },
//       },
//     },
//   });
//   console.log(user);
// }

//   const allUsers = await prisma.user.findMany({
//     include: {
//       posts: true,
//       profile: true,
//     },
//   });
//   console.dir(allUsers, { depth: null });
// }

// async function main() {
//   const post = await prisma.post.update({
//     where: { id: 1 },
//     data: { published: true },
//   });
//   console.log(post);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

// app.get("/users", async (req, res) => {
//   try {
//     const allUsers = await prisma.user.findMany();
//     console.log(allUsers);
//     res.status(200).json(allUsers);
//   } catch (error) {
//     (error: any) =>
//       console.log("error is in get users controller", error.message);
//     res.status(500).json({ error: "Intermal server error" });
//   }
// });

// app.post("/users", async (req, res) => {
//   const { email, name, title, bio, content = "" } = req.body;
//   try {
//     const result = await prisma.user.create({
//       data: {
//         email,
//         name,
//         posts: {
//           create: { title, content },
//         },
//         profile: {
//           create: { bio },
//         },
//       },
//     });
//     res.status(201).json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error creating user" });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
