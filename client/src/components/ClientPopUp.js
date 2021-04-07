import React from 'react'

const ClientPopUp = (props) => {

    // const [list, createList] = useState()
    
    let array = [] 

    for (let i=0; i< (props.clientListInRange.length)/2; i+=2) {
        array.push(`${props.clientListInRange[i]}: $${props.clientListInRange[i+1]}`)
    }
    console.log(array)

    function hidePopup (event) {
        props.setShowClients(false)
    }

    console.log(props.clientListInRange)

    if (props.showClients) {
    return (
        <div class="popup-wrapper" 
        style ={props.showClients ?  {display: 'flex'} : {display: 'none'}}>
        <div class="popup">
            <h3>Clients with Sales between ${props.min} and ${props.max}:</h3>
            <ul>{array.map((client, index) => {
                return(
                <li key = {index}>{client}</li>)
            })}</ul>
            <button  onClick = {hidePopup}>Exit</button>
        </div>
        </div>
    )} else return null 
}

export default ClientPopUp
