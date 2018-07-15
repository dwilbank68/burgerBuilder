import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {BurgerBuilder} from "./BurgerBuilder";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('BurgerBuilder', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
    })

    it('should render BuildControls if ingredients present', () => {
        wrapper.setProps({ings:{salad:0}})
        // use the 'expect' live template to see available matchers
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })


});