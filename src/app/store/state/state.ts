import { IBlog } from "../models/IBlog";

export const initialState = {
  counter: 0,
  welcome: ''
};

export const blogState: IBlog[] = [
  {
    id: 1,
    title: "Angular",
    description: "Angular is a web framework that empowers developers to build fast, reliable applications."
  },
  // {
  //   id: 2,
  //   title: "React",
  //   description: "React is a JavaScript library for building user interfaces with a component-based architecture."
  // },
  // {
  //   id: 3,
  //   title: "Vue.js",
  //   description: "Vue.js is a progressive JavaScript framework for building interactive web interfaces."
  // },
  // {
  //   id: 4,
  //   title: "Node.js",
  //   description: "Node.js is a JavaScript runtime built on Chrome's V8 engine, ideal for building fast, scalable server-side applications."
  // }
];
