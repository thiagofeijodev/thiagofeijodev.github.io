import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'

test('should render', async () => {
  render(<App />)

  expect(screen.getByText('Thiago Feijó')).toBeInTheDocument()
})
