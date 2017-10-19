import React, { Component } from 'react';
import LpTitle from '../lpTitle';
import $ from "jquery";
import "jquery-circliful";
import CirclifulChart from '../widget/circlifulChart';
import Highcharts from 'highcharts';

class AdminStatistics extends Component {

    componentDidMount() {
        $(".circliful-chart").circliful({
            animation: 1,
            animationStep: 6,
            foregroundBorderWidth: 5,
            backgroundBorderWidth: 1,
            percent: 88,
            iconColor: '#3498DB',
            iconSize: '40',
            iconPosition: 'middle'
        });
        Highcharts.chart('container-chart', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Monthly Average Presence'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number Presence'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Admin',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

            }, {
                name: 'Workers',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

            }, {
                name: 'Teachers',
                data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

            }, {
                name: 'Students',
                data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
            }]
        });
    }


    render() {
        return (
            <div>
                <LpTitle title='View All Statistics'></LpTitle>
                <p>Dictas principes pri ea. Ex vim soluta accusam, per in illum liberavisse. Eum viderer saperet adversarium
                    id, erat mazim te est. Adhuc hendrerit disputando duo eu, sed fugit corrumpit efficiantur ex. Eum etiam
                    iudico gubergren eu.</p>

                <div className="row">
                    <div className="col-lg-3">
                        <CirclifulChart icon='f1c0' title='4564' text='Total Users' percent='60' />
                    </div>
                    <div className="col-lg-3">
                        <CirclifulChart icon='f0c0' title='56' text='Total Workers' percent='25' />
                    </div>
                    <div className="col-lg-3">
                        <CirclifulChart icon="f19d" title='33' text='Total Teacher' percent='88' />
                    </div>
                    <div className="col-lg-3">
                        <CirclifulChart icon="f0b1" title='452' text='Total Students' percent='82' />
                    </div>
                </div>

                {/**
                 * Highcharts
                 */}

                <div className="row card-box">
                    <div id="container-chart"></div>
                </div>


            </div>
        );
    }
}

export default AdminStatistics;