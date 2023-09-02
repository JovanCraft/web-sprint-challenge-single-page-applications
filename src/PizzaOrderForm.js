import React, {useState} from 'react'
import axios from 'axios'

const PizzaOrderForm = () => {
    const [name, setName] = useState('')
    const [size, setSize] = useState('')
    const [toppings, setToppings] = useState({
        toppings1: false,
        toppings2: false,
        toppings3: false,
        toppings4: false
    })
    const [specialInstructions, setSpecialInstructions] = useState('')

    const change = e => {
        const { name, value, checked, type } = e.target
        const valueToUse = type === 'checkbox' ? checked : value

        setName(valueToUse)
        setSize(valueToUse)
        setToppings({ ...toppings, [name]: valueToUse})
        setSpecialInstructions(valueToUse)

    }

    const submit = e => {
        e.preventDefault()

        const orderPayload = {
            name,
            size,
            ...toppings,
            special: specialInstructions,
          };

        axios
        .post(`https://reqres.in/api/orders`, orderPayload)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err.message)
        })
        setName("")
        setSize("")
        setToppings({
            topping1: false,
            topping2: false,
            topping3: false,
            topping4: false,
        })
        setSpecialInstructions('')
    }

    return (
        <div>
            <h2>Build Your Own Pizza</h2>
            <form id='pizza-form' onSubmit={submit}>
                <label htmlFor='name-input'>Name:</label>
                <input
                    type='text'
                    id='name-input'
                    value={name}
                    onChange={change}
                /><br />
                <label htmlFor='size-dropdown'>Pizza Size:</label>
                <select id='size-dropdown' value={size} onChange={change}>
                    <option value='small'>Small</option>
                    <option value='medium'>Medium</option>
                    <option value='large'>Large</option>

                </select><br />

                <
            </form>
        </div>
    )
}
