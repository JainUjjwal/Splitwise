import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateGroupModal from './CreateGroupModal';

describe('CreateGroupModal', ()=>{
    const userList = [{userId:1,Fname:"Ujjwal"},{userId:2,Fname:"Jain"}]
    test('render Form Input', () => {
        render(<CreateGroupModal friends={userList} />);
        screen.debug();
    })
})