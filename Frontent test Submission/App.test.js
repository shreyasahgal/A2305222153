import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock fetch
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          shortUrl: 'http://tiny.ly/abc123',
          expiry: '2025-08-10T12:00:00Z',
        }),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders the TinyURL Shortener heading', () => {
  render(<App />);
  const heading = screen.getByText(/TinyURL Shortener/i);
  expect(heading).toBeInTheDocument();
});

test('renders 5 sets of input fields', () => {
  render(<App />);
  const urlInputs = screen.getAllByPlaceholderText('Enter long URL');
  expect(urlInputs.length).toBe(5);
});

test('allows typing into a URL input field', () => {
  render(<App />);
  const firstInput = screen.getAllByPlaceholderText('Enter long URL')[0];
  fireEvent.change(firstInput, { target: { value: 'https://example.com' } });
  expect(firstInput.value).toBe('https://example.com');
});

test('shows error if empty URL is submitted', async () => {
  render(<App />);
  const shortenButton = screen.getByText(/Shorten All URLs/i);
  fireEvent.click(shortenButton);

  await waitFor(() => {
    const errorMessages = screen.getAllByText(/Long URL is required/i);
    expect(errorMessages.length).toBeGreaterThan(0);
  });
});
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock fetch
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          shortUrl: 'http://tiny.ly/abc123',
          expiry: '2025-08-10T12:00:00Z',
        }),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders the TinyURL Shortener heading', () => {
  render(<App />);
  const heading = screen.getByText(/TinyURL Shortener/i);
  expect(heading).toBeInTheDocument();
});

test('renders 5 sets of input fields', () => {
  render(<App />);
  const urlInputs = screen.getAllByPlaceholderText('Enter long URL');
  expect(urlInputs.length).toBe(5);
});

test('allows typing into a URL input field', () => {
  render(<App />);
  const firstInput = screen.getAllByPlaceholderText('Enter long URL')[0];
  fireEvent.change(firstInput, { target: { value: 'https://example.com' } });
  expect(firstInput.value).toBe('https://example.com');
});

test('shows error if empty URL is submitted', async () => {
  render(<App />);
  const shortenButton = screen.getByText(/Shorten All URLs/i);
  fireEvent.click(shortenButton);

  await waitFor(() => {
    const errorMessages = screen.getAllByText(/Long URL is required/i);
    expect(errorMessages.length).toBeGreaterThan(0);
  });
});

test('calls fetch and displays shortened URL result', async () => {
  render(<App />);

  const firstInput = screen.getAllByPlaceholderText('Enter long URL')[0];
  fireEvent.change(firstInput, { target: { value: 'https://example.com' } });

  const shortenButton = screen.getByText(/Shorten All URLs/i);
  fireEvent.click(shortenButton);

  await waitFor(() => {
    const shortLink = screen.getByText('http://tiny.ly/abc123');
    expect(shortLink).toBeInTheDocument();
  });
});


test('calls fetch and displays shortened URL result', async () => {
  render(<App />);

  const firstInput = screen.getAllByPlaceholderText('Enter long URL')[0];
  fireEvent.change(firstInput, { target: { value: 'https://example.com' } });

  const shortenButton = screen.getByText(/Shorten All URLs/i);
  fireEvent.click(shortenButton);

  await waitFor(() => {
    const shortLink = screen.getByText('http://tiny.ly/abc123');
    expect(shortLink).toBeInTheDocument();
  });
});

