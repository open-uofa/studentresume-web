import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import Mainpage from '../components/Mainpage'
import { BrowserRouter } from 'react-router-dom';

test('click Fill-out Form will go to form page', () => {
    render(<BrowserRouter> <Mainpage /> </BrowserRouter>);
    const button = screen.getByTestId('goToForm')
    userEvent.click(button);
    expect(location.pathname).toBe('/form');
})

test('test going to JSON documentation page', () => {
    render(<BrowserRouter> <Mainpage /> </BrowserRouter>);

    const link = screen.getByTestId('docJSON');
    userEvent.click(link);
    expect(link).toHaveAttribute('href', 'https://www.json.org/json-en.html');
})


test('upload some file to drop box', () => {
    render(<BrowserRouter> <Mainpage /> </BrowserRouter>);

    const file = new File([JSON.stringify({ ping: true })], "ping.json", { type: "application/json" });

    fireEvent.drop(screen.getByTestId("dragdrop"), file), {
        dataTransfer: {
            files: [file], types: ['application/json']
        }
    }
    expect(location.pathname).toBe('/form');
    global.alert = jest.fn();

})
