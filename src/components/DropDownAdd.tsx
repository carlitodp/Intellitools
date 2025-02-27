import React, { useState, useRef, useEffect } from 'react';

interface Props{
    defaultChoice: string;
    choices: string[];
    onChoiceAdd: () => void;
    onChoiceSelect: (choice: string) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function DropDownAdd({defaultChoice, choices, onChoiceAdd, onInputChange, onChoiceSelect}: Props){

return(
    <>
    <div className="d-flex flex-column gap-3">

        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {defaultChoice}
            </button>
            <ul className="dropdown-menu">
                {choices.map((choice) => (
                <li className="dropdown-item" key={choice} onClick={() => onChoiceSelect(choice)}>
                    {choice}
                </li>
                ))}
            </ul>

        </div>

        <div className="d-flex gap-1">
            <label htmlFor="classField" className="sr-only"></label>
            <input className="form-control" id="classField" placeholder="New Class" onChange={onInputChange}/>
            <button type="submit" className="btn btn-primary mb-2" onClick={onChoiceAdd}>+</button>
        </div>
    </div>
    
    </>
)
}

export default DropDownAdd;