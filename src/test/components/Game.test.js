import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Game from '../../components/Game'
import renderer from 'react-test-renderer'; 

describe('render', () => {
  test('renders without error', () => {
    const wrapper = shallow(<Game />)

    expect(wrapper).toBeTruthy();
  })

  it('renders correctly', () => {
    const tree = renderer
      .create(<Game />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

})
