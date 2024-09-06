import React, {useState, useEffect} from 'react'
import axios from 'axios'
import * as yup from 'yup'



const yupSchema = yup.object().shape({
    name: yup.string().trim().required('name is required').min(2, 'name must be at least 2 characters'),
    size: yup.string().required(),
    toppings1: yup.boolean(),
    toppings2: yup.boolean(),
    toppings3: yup.boolean(),
    toppings4: yup.boolean(),
    special: yup.string()
})

const PizzaOrderForm = () => {


    const [formErrors, setFormErrors] = useState({
        name: '',
        size: '',
        toppings1: '',
        toppings2: '',
        toppings3: '',
        toppings4: '',
    })

    const [form, setForm] = useState({
        name: '',
        size: '',
        toppings1: false,
        toppings2: false,
        toppings3: false,
        toppings4: false,
        special: ''
    })

    const validate = async (name, value) => {

            yup.reach(yupSchema, name).validate(value).then(() => {
                setFormErrors({ ...formErrors, [name]: ''})
            }).catch(err => {

                setFormErrors({ ...formErrors, [name]: err.errors[0]})
            })



    }



    const change = e => {
        const { name, value, checked, type } = e.target
        const valueToUse = type === 'checkbox' ? checked : value

        validate(name, value)
        setForm({
            ...form,
            [name]: valueToUse
        })



    }


    const submit = e => {
        e.preventDefault()

        if(formErrors.name){
            console.log('Validation errors in the form. Cannot submit.')
            return
        }


          axios.post("https://reqres.in/api/orders", form)
          .then(res => {
            console.log(res)
          })
    }

    return (
        <div>
            <h2>Build Your Own Pizza</h2>
            <form id='pizza-form' onSubmit={submit}>
                <label htmlFor='name-input'>Name:</label>
                <input
                    type='text'
                    name='name'
                    id='name-input'
                    value={form.name}
                    onChange={change}
                /><br />
                {formErrors.name && <p>{formErrors.name}</p>}
                <label htmlFor='size-dropdown'>Pizza Size:</label>
                <select name='size' id='size-dropdown' value={form.size} onChange={change}>
                    <option value='small'>Small</option>
                    <option value='medium'>Medium</option>
                    <option value='large'>Large</option>

                </select><br />

                <label>Toppings:</label>
                <div>
                    <label>
                        <input
                            type='checkbox'
                            id='toppings1'
                            name='toppings1'
                            checked={form.toppings1}
                            onChange={change}
                        />
                        Topping 1
                    </label>
                </div>
                <div>
                    <label htmlFor='topping2'>
                    <input
                        type="checkbox"
                        id="toppings2"
                        name="toppings2"
                        checked={form.toppings2}
                        onChange={change}
                    />
                    Topping 2
                    </label>
                </div>
                <div>
                <label htmlFor="topping3">
                    <input
                        type="checkbox"
                        id="toppings3"
                        name="toppings3"
                        checked={form.toppings3}
                        onChange={change}
                        />
                        Topping 3
                    </label>
                </div>

                <div>
                    <label htmlFor="topping4">
                    <input
                        type="checkbox"
                        id="toppings4"
                        name="toppings4"
                        checked={form.toppings4}
                        onChange={change}
                    />
                    Topping 4
                    </label>
                </div><br />

                <label htmlFor="special-text">Special Instructions:</label>
                <input
                    type="text"
                    id="special-text"
                    name='special'
                    value={form.special}
                    onChange={change}
                    /><br />

                <button type='submit' id='order-button'>Add to Order</button>
            </form>
        </div>
    )
}


export default PizzaOrderForm;




