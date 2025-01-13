// import * as express from "express";
// import { AuthenticatedUser } from "../../types";

// declare global {
//   namespace Express {
//     interface Request {
//       user?: {
//         id: number;
//         name: string | null;
//         email: string;
//       };
//     }
//   }
// }

declare namespace Express {
  interface Request {
    user?: {
      id: number;
      name: string;
      email: string;
    };
  }
}

export {}; //Adding export {} to index.d.ts is the key thing that makes the file a module. Without it, TypeScript considers the file a global script rather than a module, which can cause type-uniting issues.
