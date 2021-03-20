import React from 'react';
import { render, screen } from '@testing-library/react';
import SubmitButton from './SubmitButton';

describe('SubmitButton', ()=>{
    test('render Submit Button', () => {
        render(<SubmitButton/>);

        screen.debug();
    })
})