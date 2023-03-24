const fs = require('fs');
const inquirer = require('inquirer');
const { create } = require('xmlbuilder2');
const { Triangle, Circle, Square } = require('./lib/shapes');

const promptUser = async () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters:',
      validate: (input) => (input.length <= 3 ? true : 'Input must be 3 characters or less.'),
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (keyword or hexadecimal):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape:',
      choices: ['triangle', 'circle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (keyword or hexadecimal):',
    },
  ]);
};
(async () => {
    const { text, textColor, shape, shapeColor } = await promptUser();
  
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
  
    const builder = create({ version: '1.0' });
    const svg = builder
      .ele('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        width: 300,
        height: 200,
      });
  
    const shapeElement = svg.ele(selectedShape.render().name);
    Object.entries(selectedShape.render().attrs).forEach(([attrName, attrValue]) => {
      shapeElement.att(attrName, attrValue);
    });
  
    svg
      .ele('text', {
        x: 150,
        y: 100,
        'font-size': 48,
        fill: textColor,
        'font-family': 'Arial',
        'text-anchor': 'middle',
        'dominant-baseline': 'central',
      })
      .txt(text);
  
    const svgString = svg.end({ prettyPrint: true });
    fs.writeFileSync('logo.svg', svgString);
    console.log('Generated logo.svg');
  })();