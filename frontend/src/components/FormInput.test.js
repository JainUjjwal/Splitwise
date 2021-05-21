import React from 'react';
import { render, screen } from '@testing-library/react';
import FormInput from './FormInput';

describe('FormInput', ()=>{
    test('render Form Input', () => {
        render(<FormInput/>);

        screen.debug();
    })
})