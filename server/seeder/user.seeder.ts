import { IUser } from "../src/types";

const seedUsers = [
  {
    _id: "6374c3a074233b8d253a5332",
    username: "admin",
    email: "admin@gmail.com",
    password:
      "1180ba5c0f91df1f0ee3130a8361027d88e40849ed4dd908726e08c8385ba0e3d36fdad20353dad567ded3e933a368c7293493c9fb52798921e99f66a4601efd",
    salt: "5d6c38612a09420d3d307a3487f4f414",
    roles: ["63746f20e2f7763ae05f26c5"],
  },
  {
    _id: "6374c3a074233b8d253a5333",
    username: "user01",
    email: "user01@gmail.com",
    password:
      "fd6c98a9cf8d4284420d295efb373880e2c509c28615e35f877aa0cd88704494d9d61d68dac38371213df564f059e34da2a6c52c02642c020bd2b238378f02a3",
    salt: "f3b4ae1b4dbeeb5b76fd557a30a441f3",
    roles: ["63746f20e2f7763ae05f26c6"],
    projects: ["6374ea9fcca01dc1d80c9ae7", "6374ea9fcca01dc1d80c9ae8"],
  },
  {
    _id: "6374c3a074233b8d253a5334",
    username: "user02",
    email: "user02@gmail.com",
    password:
      "cd19bea5bff4acc60b5233b011b44b4d30076ea208ae318e229628c23c6b3fb53dde944420ae69a0832cbf04b66184b80040ccc78667adab5d7d9605951f5619",
    salt: "d9af3453005929934dc2fd507c82235c",
    roles: ["63746f20e2f7763ae05f26c6"],
    projects: ["6374ea9fcca01dc1d80c9ae9", "6374ea9fcca01dc1d80c9aea"],
  },
];

export default seedUsers;
