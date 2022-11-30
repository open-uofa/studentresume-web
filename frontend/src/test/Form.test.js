import React from 'react';
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import App from '../App';

test('Test delete section button', () => {
    render(<App />);
    const button = screen.getByTestId('goToForm')
    userEvent.click(button);
    const button3 = screen.getByTestId('publicationsDeleteSection')
    userEvent.click(button3);
    expect(screen.getAllByText('Publisher').length).toBe(1);
})

test('Test add new section button', () => {
    render(<App />);
    const button2 = screen.getByTestId('publicationsNewSection')
    userEvent.click(button2);
    expect(screen.getAllByText('Publisher').length).toBe(2);
})