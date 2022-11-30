import React from 'react';
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import App from '../App';


test('Changes form when clicked on a different btn', () => {
    render(<App />);
    const button = screen.getByTestId('goToForm')
    userEvent.click(button);
    const button2 = screen.getByTestId('basicsBTN')
    userEvent.click(button2);
    expect(screen.getByText('Location (optional)')).toBeInTheDocument();
    const button3 = screen.getByTestId('publicationsBTN')
    userEvent.click(button3);
    expect(screen.getByText('Publisher')).toBeInTheDocument();
})

test('Testing reset changes color button', () => {
    render(<App />);
    const icon = screen.getByTestId('CheckMark');
    expect(icon).toHaveStyle({ color: 'red' });
})

test('test going to JSON documentation page', () => {
    render(<App />);
    const link = screen.getByTestId('docJSON');
    userEvent.click(link);
    expect(link).toHaveAttribute('href', 'https://www.json.org/json-en.html');
})

test('Test download Json even when empty', () => {
    global.alert = jest.fn();
    render(<App />);
    setTimeout(() => {
        const button = screen.getByTestId('FormPageSaveJSON')
        userEvent.click(button);
    }, 1000);
    expect(global.alert).toHaveBeenCalledTimes(0);
})

test('Testing reset button', () => {
    render(<App />);
    const button = screen.getByTestId('resetFormBTN');
    userEvent.click(button);
    expect(screen.getByText('Label (optional)')).toBeInTheDocument();
})

test('Click continue to move to the review page', () => {
    render(<App />);
    const button2 = screen.getByTestId('FormPageContinueBTN');
    userEvent.click(button2);
    // wait for 1s
    setTimeout(() => {
        expect(location.pathname).toBe('/review');
    }, 1000);
})
