import React from 'react';

const SubmitButton= (props) =>{
    return(
        <div className="form-group col-sm">
            <button type={props.type} className="btn btn-primary" onClick={props.onClick}>{props.text}</button>
        </div>
    )
    
}
export default SubmitButton;