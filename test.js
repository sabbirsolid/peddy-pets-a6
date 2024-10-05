const array = [
    { name: "John", age: 25 },
    { name: "Alice", age: 30 },
    { name: "Bob", age: 20 }
  ];
  
  // Sorting by the 'age' key in ascending order
  array.sort((a, b) => a.age - b.age);
  console.log(array);