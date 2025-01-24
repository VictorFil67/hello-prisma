// import { Request } from "express";
// import { User } from "../types.ts";
// // import * as express from "express";
// // import { AuthenticatedUser } from "../../types";
// // import { Response } from "express";

// declare global {
//   namespace Express {
//     interface Request {
//       user?: User;
//     }
//   }
// }

// // declare namespace Express {
// //   interface Request {
// //     user?: {
// //       id: number;
// //       name: string;
// //       email: string;
// //     };
// //   }
// // }
// declare module "passport";

// export {}; //Adding export {} to index.d.ts is the key thing that makes the file a module. Without it, TypeScript considers the file a global script rather than a module, which can cause type-uniting issues.
