import React, { Component } from 'react';

class LpTitle extends Component {
    render() {
        var {title} = this.props || this.props.children;
        return (
            <div className="lp-title">
                    <h1>{title}</h1>
                </div>
        );
    }
}

export default LpTitle;