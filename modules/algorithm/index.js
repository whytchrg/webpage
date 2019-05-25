
'use strict'

class Algorithm {

  constructor(options) {

    this.limit = options.limit

  } // constructor

  async evaluate(input, category, color) {

    const A = await this.algorithm(input)

    const B = await this.filter(A, category, color)

    const C = await this.cut(B)

    return C

  } // evaluate

  algorithm(input) {

    const latest = Math.max(...input.map(o => o.created))
    const oldest = Math.min(...input.map(o => o.created))

    // console.log(latest)
    // console.log(oldest)

    const viewed = Math.max(...input.map(o => o.views.length))
    const blackd = Math.min(...input.map(o => o.views.length))

    // console.log(viewed)
    // console.log(blackd)

    for(let i = 0; i < input.length; i++) {
      const a = Math.map(input[i].created, oldest, latest, 0, 1)
      const b = Math.map(input[i].views.length, blackd, viewed, 0, 1)

      input[i].algorithm = (a + b) / 2
      // console.log(input[i].algorithm)
    }

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

    const big = Math.max(...input.map(o => o.algorithm))
    const sml = Math.min(...input.map(o => o.algorithm))
    const dif = big - sml

    const p1 = ((dif / 3) * 2.6) + sml
    const p2 = ((dif / 3) * 2.9) + sml

    // console.log(big) //
    //
    // console.log(sml)
    //
    // console.log(dif)
    //
    // console.log(p1)
    //
    // console.log(p2)

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


}
