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

                <label>Toppings:</label>
                <div>
                    <label>
                        <input
                            type='checkbox'
                            id='topping1'
                            name='topping1'
                            checked={toppings.topping1}
                            onChange={change}
                        />
                        Topping 1
                    </label>
                </div>
                <div>
                    <label htmlFor='topping2'>
                    <input
                        type="checkbox"
                        id="topping2"
                        name="topping2"
                        checked={toppings.topping2}
                        onChange={change}
                    />
                    Topping 2
                    </label>
                </div>
                <div>
                <label htmlFor="topping3">
                    <input
                        type="checkbox"
                        id="topping3"
                        name="topping3"
                        checked={toppings.topping3}
                        onChange={change}
                        />
                        Topping 3
                    </label>
                </div>

                <div>
                    <label htmlFor="topping4">
                    <input
                        type="checkbox"
                        id="topping4"
                        name="topping4"
                        checked={toppings.topping4}
                        onChange={change}
                    />
                    Topping 4
                    </label>
                </div><br />

                <button type='submit' id='order-button'>Add to Order</button>
            </form>
        </div>
    )
}


export default PizzaOrderForm;
