import React from 'react';

const FormInput= (props) =>{
    return(
        <div className="form-group col-sm">
            <label htmlFor={props.id}>{props.text}</label>
            <input type={props.type} className="form-control" id={props.id} onChange={props.onChange} style={props.style?{border: '1px solid red'}:{}} required={props.required}/>
        </div>
    );
}
export default FormInput;