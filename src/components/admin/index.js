import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import AdminStatistics from './adminStatistics';
import AdminAbsencesOfTeachers from './adminAbsencesOfTeachers';
import AdminAbsencesOfWorkers from './adminAbsencesOfWorkers';
import Todo from '../todo';

class AdminPage extends Component {
    render() {
        var { match } = this.props;
        return (
            <div className="container-fluid margin-top">
                <div className="row">
                    {/**
                     * Left column
                     */}
                    <div className="col-md-4 col-xs-12">
                        <div className="list-group">
                            <NavLink to={`${match.url}/statistics`} activeClassName="active" className="list-group-item">View All Statistics</NavLink>
                            <NavLink to={`${match.url}/absencesofteachers`} activeClassName="active" className="list-group-item">Absences of Teachers</NavLink>
                            <NavLink to={`${match.url}/absencesofworkers`} activeClassName="active" className="list-group-item">Absences of workers</NavLink>
                            <NavLink to={`${match.url}/Accounts`} activeClassName="active" className="list-group-item">Enable / Disable Account</NavLink>
                        </div>
                    </div>
                    {/**
                     * right column
                     */}
                    <div className="col-md-8 col-xs-12">
                        <Switch>
                            <Route path={`${match.url}/`} exact render={()=><Todo></Todo>} />
                            <Route path={`${match.url}/statistics`} component={AdminStatistics} />
                            <Route path={`${match.url}/absencesofteachers`} component={AdminAbsencesOfTeachers} />
                            <Route path={`${match.url}/absencesofworkers`} component={AdminAbsencesOfWorkers} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminPage;