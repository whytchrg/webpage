
'use strict'

const Masonry = require('masonry-layout')

class Grid {

  constructor(options) {

    this.grid         = options.grid
    this.elementClass = options.elements || 'block' // constructor, reload (masonry)
    this.elements

    this.gutterSize   = options.gutter || 1
    this.gutterFactor = 2
    this.gutterSave   = this.gutterFactor
    // this.gutter()

    this.sizeSize     = options.size
    this.sizeFactor   = 1
    this.sizeClass    = options.sizeClass || 'w'
    // this.size()
    this.msnry

  } // constructor

    init() {
        this.elements     = document.querySelectorAll('.' + this.elementClass)
        this.gutter()
        this.size()
        this.msnry     = new Masonry( this.grid, {
        itemSelector: '.' + this.elementClass,
        columnWidth: this.width + this.gutterSize * this.gutterFactor || 1,
        transitionDuration: '0.4s'
        })

        this.resize()
        this.click()
    } // init

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

    } // gutter

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
  } // reload

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

            if(this.elements[i].dataset.type == 'audio/mpeg') {
                this.elements[i].querySelector('img').src  = this.elements[i].dataset.display
                this.elements[i].querySelector('audio').src  = this.elements[i].dataset.media
                this.elements[i].querySelector('img').classList.remove('mediaSmall')
                this.elements[i].querySelector('img').classList.add('mediaLarge')
                this.elements[i].querySelector('audio').classList.remove('mediaSmall')
                this.elements[i].querySelector('audio').classList.add('mediaLarge')
            } else if(this.elements[i].dataset.type == 'video/mp4') {
                this.elements[i].querySelector('video').src  = this.elements[i].dataset.media
                this.elements[i].querySelector('img').src  = ''
                this.elements[i].querySelector('img').classList.remove('mediaLarge')
                this.elements[i].querySelector('img').classList.add('mediaSmall')
                this.elements[i].querySelector('video').classList.remove('mediaSmall')
                this.elements[i].querySelector('video').classList.add('mediaLarge')
            } else {
                this.elements[i].querySelector('img').classList.remove('mediaSmall')
                this.elements[i].querySelector('img').classList.add('mediaLarge')
                this.elements[i].querySelector('img').src  = this.elements[i].dataset.display
            }

            this.elements[i].querySelector('figcaption').classList.remove('figSmall')
            this.elements[i].querySelector('figcaption').classList.add('figLarge')
                
            if(this.elements[i].dataset.orientation == 'long') {
                // long
                width  = width  * 16 + gutter * 15;
                height = height * 4 + gutter;
            } else if(this.elements[i].dataset.orientation == 'landscape') {
                // Landscape
                width  = width  * 16 + gutter * 15;
                height = height * 8 + gutter * 7;
            } else {
                // Portrait
                width  = width  * 8 + gutter * 7;
                height = height * 8 + gutter * 7;
            }

        } else if(this.elements[i].classList.contains(this.sizeClass + '4')) { // Size 4

            this.elements[i].querySelector('img').src  = this.elements[i].dataset.display

            this.make_element_small(this.elements[i])

            if(this.elements[i].dataset.orientation == 'long') {
                // long
                width  = width  * 8 + gutter * 7;
                height = height * 2 + gutter;
            } else if(this.elements[i].dataset.orientation == 'landscape') {
                // Landscape
                width  = width  * 8 + gutter * 7;
                height = height * 4 + gutter * 3;
            } else {
                // Portrait
                width  = width  * 4 + gutter * 3;
                height = height * 4 + gutter * 3;
            }

        } else if(this.elements[i].classList.contains(this.sizeClass + '2')) { // Size 2
            this.elements[i].querySelector('img').src  = this.elements[i].dataset.medium

            this.make_element_small(this.elements[i])

            if(this.elements[i].dataset.orientation == 'long') {
                // long
                width  = width  * 4 + gutter * 3;
                height = height;
            } else if(this.elements[i].dataset.orientation == 'landscape') {
                // Landscape
                width  = width  * 4 + gutter * 3;
                height = height * 2 + gutter;
            } else {
                // Portrait
                width  = width  * 2 + gutter;
                height = height * 2 + gutter;
            }

        } else { // Basic size
            this.elements[i].querySelector('img').src  = this.elements[i].dataset.thumbnail

            this.make_element_small(this.elements[i])
            
            if(this.elements[i].dataset.orientation == 'long') {
                // long
                width  = width  * 4 + gutter * 3;
                height = height;
            } else if(this.elements[i].dataset.orientation == 'landscape') {
                // Landscape
                width  = width  * 2 + gutter;
                height = height;
            } else {
                // Portrait
                width  = width;
                height = height;
            }

        }

        this.elements[i].style.width  = width  + 'px'
        this.elements[i].style.height = height + 'px'
        
        if(this.elements[i].dataset.type == 'audio/mpeg') {
            this.elements[i].querySelector('img').style.width  = width  + 'px'
            this.elements[i].querySelector('img').style.height = height + 'px'
            this.elements[i].querySelector('audio').style.width  = width - 12  + 'px'
        } else if(this.elements[i].dataset.type == 'video/mp4') {
            this.elements[i].querySelector('video').style.width  = width  + 'px'
            this.elements[i].querySelector('video').style.height = height + 'px'
        } else {
            this.elements[i].querySelector('img').style.width  = width  + 'px'
            this.elements[i].querySelector('img').style.height = height + 'px'
        }

        this.elements[i].style.overflow = 'hidden'
      
    }
    if(r) this.reload(this.grid.clientWidth);
    return this.elements;
  }

  make_element_small(element) {
    if(element.dataset.type == 'audio/mpeg') {
        element.querySelector('audio').pause()
        element.querySelector('audio').currentTime = 0
        element.querySelector('audio').src = ''
    } else if(element.dataset.type == 'video/mp4') {
        element.querySelector('video').pause()
        element.querySelector('video').currentTime = 0
        element.querySelector('video').src = ''
    }
    element.querySelector('img').classList.remove('mediaSmall')
    element.querySelector('img').classList.add('mediaLarge')
    element.querySelector('video').classList.remove('mediaLarge')
    element.querySelector('video').classList.add('mediaSmall')
    element.querySelector('figcaption').classList.remove('figLarge')
    element.querySelector('figcaption').classList.add('figSmall')
    element.querySelector('figcaption > audio').classList.remove('mediaLarge')
    element.querySelector('figcaption > audio').classList.add('mediaSmall')
  }

  resize() {
    window.addEventListener('resize', () => {
      const width = window.innerWidth - (document.querySelector('body main').offsetLeft * 2)
      this.reload(width)
    })
  } // resize

  click() {

    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].addEventListener('click', () => {

        if(this.elements[i].classList.contains('w8')) {
          this.elements[i].classList.remove('w8')
        } else {
          for(let j = 0; j < this.elements.length; j++) {
            if(this.elements[j].classList.contains('w8')) this.elements[j].classList.remove('w8');
          }
          this.elements[i].classList.add('w8');
        }

        this.size()
        this.msnry.layout()

        this.elements[i].scrollIntoView(true)

        // if(this.elements[i].offsetTop === 0) {
        //   window.scrollBy(0, 10)
        // }

      }, false)
    }

  } // click

} // Grid

module.exports = Grid
