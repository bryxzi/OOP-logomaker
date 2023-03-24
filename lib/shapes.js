class Shape {
    constructor() {
      this.color = 'black';
    }
  
    setColor(color) {
      this.color = color;
    }
}
  
class Triangle extends Shape {
    constructor(color) {
      super();
      this.setColor(color);
    }

    render() {
      return {
        name: 'polygon',
        attrs: {
          points: '150,18 244,182 56,182',
          fill: this.color,
        },
      };
    }
}
  
class Circle extends Shape {
    constructor(color) {
      super();
      this.setColor(color);
    }

    render() {
      return {
        name: 'circle',
        attrs: {
          cx: 150,
          cy: 100,
          r: 50,
          fill: this.color,
        },
      };
    }
}
  
class Square extends Shape {
    constructor(color) {
      super();
      this.setColor(color);
    }

    render() {
      return {
        name: 'rect',
        attrs: {
          x: 100,
          y: 50,
          width: 100,
          height: 100,
          fill: this.color,
        },
      };
    }
}
  
module.exports = { Triangle, Circle, Square };
