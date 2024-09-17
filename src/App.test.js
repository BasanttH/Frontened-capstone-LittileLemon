import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';


test('renders the booking form with all fields and submit button', () => {
  render(<BookingForm />);


  expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Choose time/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Number of guests/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();


  expect(screen.getByRole('button', { name: /Make Your Reservation/i })).toBeInTheDocument();
});

test('shows validation errors when submitting an empty form', () => {
  render(<BookingForm />);

  const submitButton = screen.getByRole('button', { name: /Make Your Reservation/i });
  

  fireEvent.click(submitButton);


  expect(screen.getByText(/Enter Date/i)).toBeInTheDocument();
  expect(screen.getByText(/Enter Time/i)).toBeInTheDocument();
  expect(screen.getByText(/Number of guests must be between 1 & 10/i)).toBeInTheDocument();
  expect(screen.getByText(/Occasion is required/i)).toBeInTheDocument();
});


test('submits the form successfully with valid inputs', () => {
  render(<BookingForm />);


  fireEvent.change(screen.getByLabelText(/Choose date/i), { target: { value: '2024-09-20' } });
  fireEvent.change(screen.getByLabelText(/Choose time/i), { target: { value: '18:00' } });
  fireEvent.change(screen.getByLabelText(/Number of guests/i), { target: { value: '5' } });
  fireEvent.change(screen.getByLabelText(/Occasion/i), { target: { value: 'Birthday' } });


  const submitButton = screen.getByRole('button', { name: /Make Your Reservation/i });
  fireEvent.click(submitButton);


  expect(screen.queryByText(/Enter Date/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Enter Time/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Number of guests should be between 1 & 10/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Occasion is required/i)).not.toBeInTheDocument();


  window.alert = jest.fn();  
  expect(window.alert).toHaveBeenCalledWith('Reservation confirmed!');
});
