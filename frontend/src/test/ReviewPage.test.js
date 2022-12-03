import React from 'react';
import App from '../App';
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";



test('test review information even if not complete', () => {
    render(<App />);
    const button = screen.getByTestId('goToForm')
    userEvent.click(button);
    const button2 = screen.getByTestId('FormPageContinueBTN')
    userEvent.click(button2);
    setTimeout(() => {
        expect(location.pathname).toBe('/review');
    }, 1000);
    expect(screen.getByText('Please review your information')).toBeInTheDocument();
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
        const button = screen.getByTestId('ReviewPageSaveJSON') 
        userEvent.click(button);
    }, 1000);
    expect(global.alert).toHaveBeenCalledTimes(0);
})

test('Click continue to go back to the form page', () => {
    render(<App />);
    const button = screen.getByTestId('BackToForm');
    userEvent.click(button);
    // wait for 1s
    setTimeout(() => {
        expect(location.pathname).toBe('/form');
    }, 1000);
    const button2 = screen.getByTestId('FormPageContinueBTN')
    userEvent.click(button2);
    setTimeout(() => {
        expect(location.pathname).toBe('/review');
    }, 1000);
})

test('Click continue to move to the theme page', () => {
    render(<App />);
    const button2 = screen.getByTestId('ReviewPageSelectTheme');
    userEvent.click(button2);
    // wait for 1s
    setTimeout(() => {
        expect(location.pathname).toBe('/theme');
    }, 1000);
})
