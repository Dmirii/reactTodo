import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';



// создаем свой хук
function useInputValue(defaultValue=''){
    const [value,setValue] = useState(defaultValue);

    return {
       bind:{
        value:value,
        onChange: event => setValue(event.target.value)
       },
       clear: ()=> setValue(''),
       value: ()=> value
    }
}

// добавляем элемент туду в список
function AddTodo({onCreate}){
    const input = useInputValue('')

    function submitHandler(event){
        event.preventDefault();
        if(input.value().trim()){
            onCreate(input.value());
            input.clear();            
        }
    }

    return (
        <form style={{marginBottom:'1rem'}} onSubmit={submitHandler}>
            <input {...input.bind}/>
            <button type="submit">Add todo</button>
        </form>

    )
}

// проверяем типы данных 
AddTodo.propTypes = {
    onCreate : PropTypes.func.isRequired
}

export default AddTodo