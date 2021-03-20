import React from 'react';
import { render, screen } from '@testing-library/react';
import DataRow from './DataRow';

describe('DataRow', ()=>{
    test('render Form Input', () => {
        render(<DataRow id='2' payer='Ujjwal' discription='Milk' group='Home' timeStamp='12:00 13/2/2021' amount='20' state='true'/>);

        screen.debug();
    })
})