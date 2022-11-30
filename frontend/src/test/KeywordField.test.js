import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import App from '../App';

test('Test add new skill keyword', () => {
    render(<App />);
    const button = screen.getByTestId('goToForm')
    userEvent.click(button);

    const textField = screen.getByTestId('skills0keywordsINPUT').querySelector('input')
    expect(textField).toBeInTheDocument();

    const button2 = screen.getByTestId('skills0keywordsBTN');
    const num = screen.getAllByTestId('skillKeyword').length;

    // add skill keyword
    for (let i = 0; i < 5; i++) {
        fireEvent.change(textField, { target: { value: 'new skill' } });
        expect(textField.value).toBe('new skill');
        userEvent.click(button2);
        expect(screen.getAllByTestId('skillKeyword').length).toBe(num + i + 1);
    }
})

test('Test remove skill keyword', () => {
    render(<App />);

    const textField = screen.getByTestId('skills0keywordsINPUT').querySelector('input')
    expect(textField).toBeInTheDocument();

    const button2 = screen.getByTestId('skills0keywordsBTN');
    const num = screen.getAllByTestId('skillKeyword').length;

    fireEvent.change(textField, { target: { value: 'new skill' } });
    expect(textField.value).toBe('new skill');

    // add skill keyword
    userEvent.click(button2);
    expect(screen.getAllByTestId('skillKeyword').length).toBe(num + 1);

    // remove a skill keyword
    const button3 = screen.getByTestId('skills0keywords0DeleteBTN');
    userEvent.click(button3);
    expect(screen.getAllByTestId('skillKeyword').length).toBe(num);
})