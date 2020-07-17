
'use strict'

require('../math')

class Algorithm {

  constructor(options) {

    this.limit = options.limit

  } // constructor

  async evaluate(input, category, color) {

    // const A = await this.algorithm(input) // redundant !!

    const B = await this.filter(input, category, color)

    const C = await this.cut(B)

    return C

  } // evaluate

  algorithm(input) { // redundant !!

    const now = new Date().getTime() / 1000

    const createdMax     = Math.max(...input.map(o => o.created))
    const createdMin     = Math.min(...input.map(o => o.created))

    const addedMax       = Math.max(...input.map(o => o.added))
    const addedMin       = Math.min(...input.map(o => o.added))

    const viewsMax       = Math.max(...input.map(o => o.views.length))
    const viewsMin       = Math.min(...input.map(o => o.views.length))

    const viewsFlickrMax = Math.max(...input.map(o => o.views_flickr.length))
    const viewsFlickrMin = Math.min(...input.map(o => o.views_flickr.length))

    for(let i = 0; i < input.length; i++) {

      let viewScale = []
      for (let j = 0; j < input[i].views.length; j++) {
        const scale = (input[i].views[j].server - addedMin) / (now - addedMin)
        viewScale.push( Math.pow(scale, 16) )
      }
      input[i].viewScale = viewScale.reduce((a, b) => a + b, 0)

      let flickrScale = []
      for (let j = 0; j < input[i].views_flickr.length; j++) {
        const scale = (input[i].views_flickr[j].server - addedMin) / (now - addedMin)
        flickrScale.push( Math.pow(scale, 16) )
      }
      input[i].flickrScale = flickrScale.reduce((a, b) => a + b, 0)

    }

    const viewScaleMax = Math.max(...input.map(o => o.viewScale))
    const viewScaleMin = Math.min(...input.map(o => o.viewScale))

    const flickrScaleMax = Math.max(...input.map(o => o.flickrScale))
    const flickrScaleMin = Math.min(...input.map(o => o.flickrScale))

    for(let i = 0; i < input.length; i++) {

      // created
      const a = Math.map(input[i].created, createdMin, createdMax, 0.5, 1)

      // views
      // const b = Math.map(input[i].views.length, viewsMin, viewsMax, 0, 1)

      const d = Math.map(input[i].viewScale, viewScaleMin, viewScaleMax, 0, 1)

      // flickr views
      const c = Math.map(input[i].views_flickr.length, viewsFlickrMin, viewsFlickrMax, 0, 1)

      const e = Math.map(input[i].flickrScale, flickrScaleMin, flickrScaleMax, 0, 1)
      // console.log(a + ' ' + Math.pow(a, 0.5))

      input[i].algorithm = (Math.pow(a, 1) + Math.pow(d, 1) * 4 + Math.pow(e, 1) * 4) / 9 //
      // console.log(input[i].algorithm)
    }

    console.log(input[0])

    return input
  } // algorithm

  async filter(input, category, color) {

    const A = await this.color(input, color)

    const B = await this.category(A, category)

    return B
  } // filter

  cut(input) {
    input.sort((x,y) => (x.algorithm > y.algorithm) ? -1 : ((x.algorithm < y.algorithm) ? 1 : 0))

    let output = input.slice(0, this.limit);

    input.sort((x,y) => (x.created > y.created) ? -1 : ((x.created < y.created) ? 1 : 0))
    output.sort((x,y) => (x.created > y.created) ? -1 : ((x.created < y.created) ? 1 : 0))

    console.log("input: " + input[0].algorithm);
    console.log("output: " + output[0].algorithm);

    const big = Math.max(...output.map(o => o.algorithm))
    const sml = Math.min(...output.map(o => o.algorithm))

    const dif = big - sml

    const p1 = ((dif / 3) * 1) + sml
    const p2 = ((dif / 3) * 3) + sml

    for(let i = 0; i < output.length; i++) {

      if(output[i].algorithm < p1) {
        output[i].size = 'A'
      } else if (output[i].algorithm < p2) {
        output[i].size = 'B'
      } else {
        output[i].size = 'C'
      }

    }

    return output
  } // cut

  color(input, color) {
    let select = []

    for(let i = 0; i < input.length; i++) {

      if(color === 'io') {
        if(input[i].tags.search('bw') >= 0) select.push(input[i])
      } else if(color === 'oi') {
        if(input[i].tags.search('color') >= 0) select.push(input[i])
      } else {
        select.push(input[i])
      }

    }
    return select
  } // color

  category(input, category) {
    let select = []

    for(let i = 0; i < input.length; i++) {

      if(category=='ioo'){
    		if(input[i].tags.search('abc') >= 0) select.push(input[i])

    	} else if(category=='oio'){
    		if(input[i].tags.search('acb') >= 0) select.push(input[i])
    	} else if(category=='ooi'){
    		if(input[i].tags.search('cba') >= 0) select.push(input[i])
    	} else if(category=='iio'){
    		if(input[i].tags.search('abc') >= 0){
    			select.push(input[i])
    		} else if(input[i].tags.search('acb') >= 0){
    			select.push(input[i])
    		}
    	} else if(category=='ioi'){
    		if(input[i].tags.search('abc') >= 0){
    			select.push(input[i])
    		} else if(input[i].tags.search('cba') >= 0){
    			select.push(input[i])
    		}
    	} else if(category=='oii'){
    		if(input[i].tags.search('acb') >= 0){
    			select.push(input[i])
    		} else if(input[i].tags.search('cba') >= 0){
    			select.push(input[i])
    		}
    	} else if(category=='iii'){
    		select.push(input[i])
    	} else if(category=='ooo'){
    		select.push(input[i])
    	} else {
    	    if(input[i].tags.search(category) >= 0) select.push(input[i])
    	}

    }
    return select
  } // category

} // Algorithm

module.exports = Algorithm
