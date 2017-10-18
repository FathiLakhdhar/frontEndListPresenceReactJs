import React, { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from './carousel';

class Home extends Component {

    componentWillMount() {
        //console.log(this.props);
    }

    render() {
        return (
            <div>
                <Carousel />
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { current_user: state.current_user };
}

export default connect(mapStateToProps)(Home);