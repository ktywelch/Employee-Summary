
const render = require("../lib/htmlRenderer");

const testEmployee = []

//check that the templates exist

//check that the render can generate the HTML given an array of emploess
test("Can Rendet HTML from employees", () => {
  const e = testEmployee.render;
  expect(typeof(e)).toBe("object");
});

