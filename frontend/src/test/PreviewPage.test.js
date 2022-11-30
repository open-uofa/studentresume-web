import { render, screen, fireEvent, getByText } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import App from '../App';


test('Expect to be in Preview Page', () => {
    render(<App />);
    const button = screen.getByTestId('goToForm')
    userEvent.click(button);
    const button2 = screen.getByTestId('FormPageContinueBTN')
    userEvent.click(button2);
    const button3 = screen.getByTestId('ReviewPageSelectTheme');
    userEvent.click(button3);
    const button4 = screen.getByTestId('previewPageBTN');
    userEvent.click(button4);
    setTimeout(() => {
        expect(location.pathname).toBe('/preview');
    }, 1000);
})

test('test download resume', () => {
    global.alert = jest.fn();
    render(<App />);
    setTimeout(() => {
        const button = screen.getByTestId('savePDF')
        userEvent.click(button);
    }, 1000);
    expect(global.alert).toHaveBeenCalledTimes(0);
});

test('test download json', () => {
    global.alert = jest.fn();
    render(<App />);
    setTimeout(() => {
        const button3 = screen.getByTestId('saveJSON')
        userEvent.click(button3);
    }, 1000);
    expect(global.alert).toHaveBeenCalledTimes(0);
});


test('test going back to Change Theme Page', () => {
    global.alert = jest.fn();
    render(<App />);
    const button = screen.getByTestId('goToThemePage')
    userEvent.click(button);
    setTimeout(() => {
        expect(location.pathname).toBe('/theme');
    }, 1000);
});

test('test going back to Form Page', () => {
    global.alert = jest.fn();
    render(<App />);
    const button = screen.getByTestId('previewPageBTN');
    userEvent.click(button);
    const button2 = screen.getByTestId('goToForm')
    userEvent.click(button2);
    setTimeout(() => {
        expect(location.pathname).toBe('/preview');
    }, 1000);
});