import React from 'react'
import { shallow, mount } from 'enzyme'
import Board from '../../components/Board'
const boardSize = 5
const actionA = jest.fn()
const squares = Array.from({length: boardSize}).map(() => new Array(boardSize).fill(null))
const CreateNode = (
  <Board
    boardSize={boardSize}
    squares={squares}
    onClick={actionA}
  />
)

describe('render', () => {
  it('renders without error', () => {
    const wrapper = shallow(<Board />)

    expect(wrapper).toBeTruthy()
  })

  it('renders with correct number of rows and squares', () => {
    const wrapper = mount(CreateNode)

    expect(wrapper.find('.board-row').length).toBe(boardSize)
    expect(wrapper.find('.square').length).toBe(boardSize * boardSize)
  })

  it('click can send action', () => {
    const wrapper = mount(CreateNode)
    // console.log(wrapper.debug()) // this can helps on print the real node struture when testing.
    wrapper.find('.square').at(6).simulate('click')

    expect(actionA).toBeCalled()
    expect(actionA).toBeCalledWith(1,1)
  })

})
