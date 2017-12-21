import React from 'react'
import { shallow, render } from 'enzyme'
import Home from '../../pages/Home'

describe('render', () => {
  test('renders without error', () => {
    const wrapper = shallow(<Home />)

    expect(wrapper).toBeTruthy()
  })

  test('render exact children', () => {
    const wrapper = render(<Home />)
    
    expect(wrapper.find('div').length).toBe(2)
  })

  test('render exact link number', () => {
    const wrapper = render(<Home />)
    
    expect(wrapper.find('a').length).toBe(3)
  })

  test('render exact link text', () => {
    const wrapper = render(<Home />)
    
    expect(wrapper.find('a').first().text()).toBe('Tic tac toe')
  })
})
