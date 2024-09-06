import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <div>
            <h2>Welcome to Bloomtech Eats</h2>
            <p>Order your custom pizza now!</p>
            <Link to='pizza' id='order-pizza'>Order Pizza</Link>
        </div>
    )
}




