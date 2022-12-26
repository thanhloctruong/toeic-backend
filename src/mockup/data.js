import bcrypt from "bcrypt";
const data = {
  users: [
    {
      address: "14 Phan van tri",
      phoneNumber: "086555555",
      name: "acan",
      email: "thanhloctruong102@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },
    {
      address: "12 Phan van tri",
      phoneNumber: "086555554",
      name: "acan1",
      email: "thanhloctruong1022@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: false,
    },
  ],

  exercise: [
    {
      name: "test1",
      des: [
        {
          url: "test",
          question: "Qt1",
          amountAnswer: 3,
          answerCorrect: "A",
        },
        {
          url: "test",
          question: "Qt2",
          amountAnswer: 3,
          answerCorrect: "A",
        },
        {
          url: "test",
          question: "Qt3",
          amountAnswer: 3,
          answerCorrect: "A",
        },
      ],
    },
    {
      name: "test2",
      des: [
        {
          url: "test",
          question: "test2",
          amountAnswer: 3,
          answerCorrect: "A",
        },
      ],
    },
  ],

  room: [
    {
      name: "rooom 1",
      testDes: "63a9612151eca9ac803c43e1",
      listUser: [
        {
          name: "acan",
          address: "14 Phan van tri",
          phoneNumber: "086555555",
          email: "thanhloctruong102@gmail.com",
          _id: "63a95d5673a0ebb8ec07f681",
          __v: 0,
          createdAt: "2022-12-26T08:37:42.634Z",
          updatedAt: "2022-12-26T08:37:42.634Z",
        },
        {
          name: "acan1",
          address: "12 Phan van tri",
          phoneNumber: "086555554",
          email: "thanhloctruong1022@gmail.com",
          _id: "63a95d5673a0ebb8ec07f682",
          __v: 0,
          createdAt: "2022-12-26T08:37:42.635Z",
          updatedAt: "2022-12-26T08:37:42.635Z",
        },
      ],
    },
    {
      name: "rooom 2",
      testDes: "63a9612151eca9ac803c43e5",
    },
  ],
};
export default data;
