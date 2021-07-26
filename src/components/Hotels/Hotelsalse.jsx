import React from 'react'
import CardHotelsales2 from './CardHotelsales2'
import CardHotelsSales from './CardHotelsSales'

const Hotelsalse = () => {
    return (
        <div>
                   <CardHotelsSales />
                   <h2 style={{fontweight: 600,marginTop:10}}>فنادق اخرى مناسبة لك </h2>
                   <CardHotelsales2 />

        </div>
    )
}

export default Hotelsalse
