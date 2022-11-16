const seedUser = [
  {
    _id: "6374c3a074233b8d253a5332",
    username: "admin",
    email: "admin@gmail.com",
    password: "admin",
    roles: ["63746f20e2f7763ae05f26c5"],
  },
  {
    _id: "6374c3a074233b8d253a5333",
    username: "user01",
    email: "user01@gmail.com",
    password: "admin",
    roles: ["63746f20e2f7763ae05f26c6"],
    projects: ["6374ea9fcca01dc1d80c9ae7", "6374ea9fcca01dc1d80c9ae8"],
  },
  {
    _id: "6374c3a074233b8d253a5334",
    username: "user02",
    email: "user02@gmail.com",
    password: "user02",
    roles: ["63746f20e2f7763ae05f26c6"],
    projects: ["6374ea9fcca01dc1d80c9ae9", "6374ea9fcca01dc1d80c9aea"],
  },
];

export default seedUser;
