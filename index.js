const fs = require('fs');
const inquirer = require('inquirer');
const { Triangle, Circle, Square } = require('./lib/shapes');
const SvgBuilder = require('svg-builder');

const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters:',
    validate: (input) => (input.length <= 3 ? true : 'Please enter up to three characters.')
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter the text color (keyword or hexadecimal):'
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Select a shape:',
    choices: ['circle', 'triangle', 'square']
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color (keyword or hexadecimal):'
  }
];

inquirer.prompt(questions).then((answers) => {
  const { text, textColor, shape, shapeColor } = answers;
  let selectedShape;

  switch (shape) {
    case 'triangle':
      selectedShape = new Triangle();
      break;
    case 'circle':
      selectedShape = new Circle();
      break;
    case 'square':
      selectedShape = new Square();
      break;
  }

  selectedShape.setColor(shapeColor);

  const svg = new SvgBuilder(300, 200)
    .addElement(selectedShape.render())
    .addText(text, {
      x: 150,
      y: 100,
      fontSize: 48,
      fill: textColor,
      fontFamily: 'Arial',
      textAnchor: 'middle',
      dominantBaseline: 'central'
    })
    .toString();

  fs.writeFileSync('logo.svg', svg);
  console.log('Generated logo.svg');
});
