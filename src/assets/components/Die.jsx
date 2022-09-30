import React from 'react'

export default function Die(props) {

    const styles = {
        
        held:{
            backgroundColor:  "#59E391"
        },
        notHeld: {
            backgroundColor: "white"
        }
        
    }


return (
    <div className="die-box" style={props.isHeld ? styles.held : styles.notHeld} onClick={props.holdDice}>
    <h1 className="number">{props.value}</h1>
</div>
)
   
}