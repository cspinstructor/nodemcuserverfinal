const array = [
  {
    name: 'alan',
    value: 1
  },
  {
    name: 'ball',
    value: 2
  },
  {
    name: 'cat',
    value: 3
  }
];

array.map(obj => {
  console.log(obj.name);
});

array.forEach(obj => {
  console.log(obj.value);
});
