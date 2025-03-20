const updatePagination = (event, operator,state, setState) => {
    if(operator === "+"){
        const newState = {...state};
        newState.page += 1
        setState(newState)
     } else if (operator === "-"){
        const newState = {...state};
        newState.page -= 1
        setState(newState)
     }
     }


     export default updatePagination