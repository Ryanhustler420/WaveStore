import React, { Component } from 'react'
import HomeSlider from './home_slider';
import HomePromotions from './home_promotion';

class Home extends Component {
    render() {
        return (
            <div>
                <HomeSlider />
                <HomePromotions />
            </div>
        )
    }
}

export default Home;
