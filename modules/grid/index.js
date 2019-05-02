
'use strict'

class Grid {

  constructor(grid, options) {

    this.grid         = grid
    this.elementClass = options.elements || 'block' // constructor, reload (masonry)
    this.elements     = document.getElementsByClassName(this.elementClass)

    this.gutterSize   = options.gutter || 1
    this.gutterFactor = 1
    this.gutterSave   = this.gutterFactor
    this.gutter()

    this.sizeSize     = options.size || 48
    this.sizeFactor   = 1
    this.sizeClass    = options.sizeClass || 'w'
    this.size()

    this.msnry     = new Masonry( this.grid, {
      itemSelector: '.' + this.elementClass,
      columnWidth: this.width + this.gutterSize * this.gutterFactor || 1,
      transitionDuration: '0.4s'
    })

    this.resize()
    // this.click()
  }

  gutter(input = this.gutterFactor) {

    // size gutter
    let r = false
    if(input != this.gutterFactor){
      this.gutterFactor  = input
      r = true
    }
    let gutter = this.gutterSize * this.gutterFactor

    // apply gutter
    for(let i = 0; i < this.elements.length; i++) {
      this.elements[i].style.marginRight  = gutter + 'px'
      this.elements[i].style.marginBottom = gutter + 'px'
    }
    if(r) this.reload(this.grid.clientWidth)

  } // gutter END !!

  reload(width) {
    this.msnry.destroy()
    this.grid.style.width = width + 'px'
    this.size()
    this.msnry = new Masonry( this.grid, {
      itemSelector: '.' + this.elementClass,
      columnWidth: this.width + this.gutterSize * this.gutterFactor,
      transitionDuration: '0.4s'
    })
    this.click()
  }

  size(input = this.sizeFactor) { //
    // size sizeSize
    let r = false;
    if(input != this.sizeFactor){
      this.sizeFactor = input;
      r = true;
    }
    let size = this.sizeSize * this.sizeFactor

    // get grid width
    let gridWidth = this.grid.clientWidth

    let a = Math.floor(gridWidth / (size + (this.gutterSize * this.gutterFactor)));
    let b = a * size + a * (this.gutterSize * this.gutterFactor);
    //let c = gridWidth - b;
    //let d = (gridWidth - b) / a;

    this.width = (size + (gridWidth - b) / a);

    for(let i = 0; i < this.elements.length; i++) {
      let width  = this.width;
      let height = this.width * Math.SQRT2;
      let gutter = this.gutterSize * this.gutterFactor;

      if(this.elements[i].classList.contains(this.sizeClass + '8')) { // Size 8

        if(this.elements[i].getAttribute('data-orientation') == 'landscape') {
          // Landscape
          width  = width  * 16 + gutter * 15;
          height = height * 8 + gutter * 7;
        } else {
          // Portrait
          width  = width  * 8 + gutter * 7;
          height = height * 8 + gutter * 7;
        }

      } else if(this.elements[i].classList.contains(this.sizeClass + '4')) { // Size 4

        if(this.elements[i].getAttribute('data-orientation') == 'landscape') {
          // Landscape
          width  = width  * 8 + gutter * 7;
          height = height * 4 + gutter * 3;
        } else {
          // Portrait
          width  = width  * 4 + gutter * 3;
          height = height * 4 + gutter * 3;
        }

      } else if(this.elements[i].classList.contains(this.sizeClass + '2')) { // Size 2

        if(this.elements[i].getAttribute('data-orientation') == 'landscape') {
          // Landscape
          width  = width  * 4 + gutter * 3;
          height = height * 2 + gutter;
        } else {
          // Portrait
          width  = width  * 2 + gutter;
          height = height * 2 + gutter;
        }

      } else { // Basic size

        if(this.elements[i].getAttribute('data-orientation') == 'landscape') {
          // Landscape
          width  = width  * 2 + gutter;
          height = height;
        } else {
          // Portrait
          width  = width;
          height = height;
        }

      }

      this.elements[i].style.width  = width  + 'px';
      this.elements[i].style.height = height + 'px';
      this.elements[i].style.overflow = 'hidden'
    }
    if(r) this.reload(this.grid.clientWidth);
    return this.elements;
  }

  resize() {
    window.addEventListener('resize', function() {
      this.reload(this.grid.clientWidth)
    }.bind(this))
  }

  click() {
    this.grid.addEventListener('click', function(element){
      console.log(element)
      if(element.path[2].classList.contains('w8')) {
        element.path[2].classList.remove('w8');
      } else {
        let siblings = element.path[2].parentElement.children;
        for(let i = 0; i < this.elements.length; i++) {
          //console.log(siblings[i].classList);
          if(this.elements[i].classList.contains('w8')) this.elements[i].classList.remove('w8');
        }
        element.path[2].classList.add('w8');
      }

      this.size();
      this.msnry.layout();
    }.bind(this), false);
  }

}
