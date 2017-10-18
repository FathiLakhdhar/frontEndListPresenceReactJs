import React, { Component } from 'react';

class CirclifulChart extends Component {
    render() {
        var {icon = 'f19d' , percent = 0 , fgcolor= "#5fbeaa", bgcolor="#505A66", title='0', text='Ex vim soluta'} = this.props;
        return (
            <div className="widget-simple-chart text-right card-box">
                <div className="circliful-chart" data-icon={icon} data-percent={percent} data-fgcolor={fgcolor} data-bgcolor={bgcolor}></div>
                <h3 className="text-success counter">{title}</h3>
                <p className="text-muted text-nowrap">{text}</p>
            </div>
        );
    }
}

export default CirclifulChart;