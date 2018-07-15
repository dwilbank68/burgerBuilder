import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});


describe('<NavigationItems/>', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>);
    })

    it('should render 2 <NavigationItem/> elements if not auth', () => {
        expect(wrapper.find(NavigationItem).length).toBe(2);
    })

    it('should render 3 <NavigationItem/> elements if auth', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })

    it('should render logout if auth', () => {
        wrapper.setProps({isAuthenticated: true});
        const x = <NavigationItem link="/logout">Logout</NavigationItem>;
        expect(wrapper.contains(x)).toEqual(true);
    })

});