const App = require("./app");
const {
  headerModule,
  userModule,
  articleModule,
  categoryModule,
} = require("./Kernel");

require("dotenv").config();

const app = new App(
  [headerModule, userModule, articleModule, categoryModule],
  process.env.PORT
);
