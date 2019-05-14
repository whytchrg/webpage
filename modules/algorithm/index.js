
'use strict'

class Algorithm {

  constructor() {

  }

  async evaluate(input, category, color) {

    const A = await this.color(input, color)

    const B = await this.category(A, category)

    return B

  } // evaluate

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
  } // color


}
