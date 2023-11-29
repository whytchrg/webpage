
'use strict'

class Filter {

    constructor(options) {

        this.limit = options.limit

    }

    async evaluate(input, category, color) {

        // const A = await this.algorithm(input) // redundant !!

        const B = await this.filter(input, category, color)
        // console.log(B);

        const C = await this.cut(B)

        return C

    }

  async filter(input, category, color) {

    // console.log(color);
    const A = await this.color(input, color)
    // console.log(A);

    // console.log(category);
    const B = await this.category(A, category)
    // console.log(B);

    return B
  } // filter

  cut(input) {
    input.sort((x,y) => (x.algorithm > y.algorithm) ? -1 : ((x.algorithm < y.algorithm) ? 1 : 0))

    let output = input.slice(0, this.limit);

    input.sort((x,y) => (x.created > y.created) ? -1 : ((x.created < y.created) ? 1 : 0))
    output.sort((x,y) => (x.created > y.created) ? -1 : ((x.created < y.created) ? 1 : 0))

    // console.log("input: " + input[0].algorithm);
    // console.log("output: " + output[0].algorithm);

    const big = Math.max(...output.map(o => o.algorithm))
    const sml = Math.min(...output.map(o => o.algorithm))

    const dif = big - sml

    const p1 = ((dif / 3) * 2.5) + sml
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
    // console.log(input[i].keywords);

      if(color === 'io') {
        if(input[i].keywords.search('bw') >= 0) select.push(input[i])
      } else if(color === 'oi') {
        if(input[i].keywords.search('color') >= 0) select.push(input[i])
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
    		if(input[i].keywords.search('abc') >= 0) select.push(input[i])

    	} else if(category=='oio'){
    		if(input[i].keywords.search('acb') >= 0) select.push(input[i])
    	} else if(category=='ooi'){
    		if(input[i].keywords.search('cba') >= 0) select.push(input[i])
    	} else if(category=='iio'){
    		if(input[i].keywords.search('abc') >= 0){
    			select.push(input[i])
    		} else if(input[i].keywords.search('acb') >= 0){
    			select.push(input[i])
    		}
    	} else if(category=='ioi'){
    		if(input[i].keywords.search('abc') >= 0){
    			select.push(input[i])
    		} else if(input[i].keywords.search('cba') >= 0){
    			select.push(input[i])
    		}
    	} else if(category=='oii'){
    		if(input[i].keywords.search('acb') >= 0){
    			select.push(input[i])
    		} else if(input[i].keywords.search('cba') >= 0){
    			select.push(input[i])
    		}
    	} else if(category=='iii' || category=='ooo'){
        if(input[i].keywords.search('abc') >= 0){
          select.push(input[i])
        } else if(input[i].keywords.search('acb') >= 0){
    			select.push(input[i])
    		}else if(input[i].keywords.search('cba') >= 0){
          select.push(input[i])
        }
    	} else {
    	    if(input[i].keywords.search(category) >= 0) select.push(input[i])
    	}

    }
    return select
  } // category

} // Algorithm
