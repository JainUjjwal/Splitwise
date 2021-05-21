import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileImage from './ProfileImage';

describe('ProfileImage', ()=>{
    test('render image', () => {
        render(<ProfileImage url = "abc"/>);

        screen.debug();
    })
})