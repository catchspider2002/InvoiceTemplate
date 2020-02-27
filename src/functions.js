// Area function
const area = (length, breadth) => {
  let a = length * breadth;
  console.log("Area of the rectangle is " + a + " square unit");
};

// Perimeter function
const perimeter = (length, breadth) => {
  let p = 2 * (length + breadth);
  console.log("Perimeter of the rectangle is " + p + " unit");
};

module.exports = {
  area,
  perimeter
};
