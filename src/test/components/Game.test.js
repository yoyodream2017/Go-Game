import React from 'react'
import { shallow, mount } from 'enzyme'
import Game from '../../components/Game'
import renderer from 'react-test-renderer'

const boardSize = 13
const squares = Array.from({length: boardSize}).map(() => new Array(boardSize).fill(null))

describe('render', () => {
  test('renders without error', () => {
    const wrapper = shallow(<Game />)

    expect(wrapper).toBeTruthy()
  })

  it('renders fitting snapshot', () => {
    const tree = renderer
      .create(<Game />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders with correct style', () => {
    const wrapper = shallow(<Game />)

    expect(wrapper.find('.game').length).toBe(1)
    expect(wrapper.find('.game-board').length).toBe(1)
    expect(wrapper.find('.game-info').length).toBe(1)
  })

  it('default value', () => {
    const wrapper = mount(<Game />)
    // console.log(wrapper.debug())
    expect(wrapper.state('stepNumber')).toBe(0)
    expect(wrapper.state('xIsNext')).toBe(true)
    expect(wrapper.state('history').length).toEqual(1)
    expect(wrapper.state('history')[0]).toEqual({
      squares: squares,
      position: []
    })
    // toBe is  === for object but toEqual is ==
  })

  it('click square can make turn work well', () => {
    const wrapper = mount(<Game />)
    squares[0][0] = 'X'
    wrapper.find('.square').at(0).simulate('click')

    expect(wrapper.state('stepNumber')).toBe(1)
    expect(wrapper.state('xIsNext')).toBe(false)
    expect(wrapper.state('history').length).toEqual(2)
    expect(wrapper.state('history')[1]).toEqual({
      squares: squares,
      position: [0,0]
    })
  })

  it('states works well', () => {
    const wrapper = mount(<Game />)

    wrapper.find('.square').at(10).simulate('click')

    expect(wrapper.find('.game-info>div').first().text()).toBe('Next player: O')

    wrapper.find('.square').at(11).simulate('click')

    expect(wrapper.find('.game-info>div').first().text()).toBe('Next player: X')
  })

  it('click can calculate winner and gameover', () => {
    const wrapper = mount(<Game />)
    wrapper.find('.square').at(0).simulate('click')
    wrapper.find('.square').at(5).simulate('click')
    wrapper.find('.square').at(1).simulate('click')
    wrapper.find('.square').at(6).simulate('click')
    wrapper.find('.square').at(2).simulate('click')
    wrapper.find('.square').at(7).simulate('click')
    wrapper.find('.square').at(3).simulate('click')
    wrapper.find('.square').at(8).simulate('click')
    wrapper.find('.square').at(100).simulate('click')
    wrapper.find('.square').at(9).simulate('click')
    
    expect(wrapper.find('.game-info>div').first().text()).toBe('Winner: O')

    wrapper.find('.square').at(101).simulate('click')

    expect(wrapper.find('.game-info>div').first().text()).toBe('Winner: O')
  })

  it('history shows and works correctly', () => {
    const wrapper = mount(<Game />)

    wrapper.find('.square').at(0).simulate('click')
    wrapper.find('.square').at(5).simulate('click')
    wrapper.find('.square').at(1).simulate('click')
    wrapper.find('.square').at(6).simulate('click')
    wrapper.find('.square').at(2).simulate('click')
    wrapper.find('.square').at(7).simulate('click')
    wrapper.find('.square').at(3).simulate('click')
    wrapper.find('.square').at(8).simulate('click')

    expect(wrapper.find('.game-info ol li button').at(4).text()).toBe('Go to move #4')

    wrapper.find('.game-info ol li button').at(1).simulate('click')
    squares[0][0] = 'X'
    expect(wrapper.state('history')[1]).toEqual({
      squares: squares,
      position: [0,0]
    })

    // The following test will re-write history.    
    wrapper.find('.square').at(14).simulate('click')
    squares[1][1] = 'O'
    expect(wrapper.state('history')[2]).toEqual({
      squares: squares,
      position: [1,1]
    })
  })
})
