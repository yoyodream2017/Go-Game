import React from 'react'
import { shallow, mount } from 'enzyme'
import Square from '../../components/Square'

describe('render', () => {
  it('renders without error', () => {
    const wrapper = shallow(<Square />)

    expect(wrapper).toBeTruthy()
  })

  it('renders with correct style', () => {
    const wrapper = shallow(<Square />)

    expect(wrapper.find('.square').length).toBe(1)
  })

  it('values can be passed down correctly', () => {
    const value = 'X'
    const wrapper = mount(<Square value={value} />)
    
    expect(wrapper.text()).toBe('X')
  })

  it('click can send action', () => {
    const actionA = jest.fn()
    const wrapper = mount(<Square onClick={actionA} />)
    wrapper.simulate('click')

    expect(actionA).toBeCalled()
  })

})
