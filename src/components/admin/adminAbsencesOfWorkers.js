import React, { Component } from 'react';
import LpTitle from '../lpTitle';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'react-times';
import { isEmpty } from 'lodash';
import * as moment from 'moment';
import { addListPresenceAction, getAllUsersByRole } from '../../actions/adminAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class AdminAbsencesOfWorkers extends Component {
    constructor() {
        super();
        this.state = {
            errors: {},
            date: moment(),
            time1: moment().format("HH:mm"),
            time2: moment().add(1, 'hours').format("HH:mm"),
            focused: null,
            workers: [],
        }
    }

    componentDidMount(){
        this.props.getUsersByRole('ROLE_WORKER')
        .then(result => {
            let workers = result.data
            workers.map(function(t) {
                t.checked = false;
                t.isPresent = false;
                return t;
            });
            this.setState({ workers })
        })
        .catch(e => console.log(e));
    }

    HandleSubmit(e) {
        e.preventDefault();
        this.setState({ errors: {} });
        var lp = this.filterByChecked();
        const { errors, isValid } = this.isValid(lp);
        if (isValid) {
            //Action 
            let { date, time1, time2 } = this.state;
            date = date.format("YYYY-MM-DD");
            let data = { lp, date, time1, time2 };
            this.props.newlp(data).then(res => {
                console.log(res.data);
                if (res.data.success) {
                    this.resetworkersList();
                }
            }).catch(e => {
                if (e.response)
                    console.log(e.response.data);
                
            });

        } else {
            this.setState({ errors });
        }


    }

    filterByChecked() { return this.state.workers.filter(obj => obj.checked); }

    isValid(list) {
        var errors = {};
        if (isEmpty(list))
            errors.list = "List presence is Empty";
        if (!this.state.date)
            errors.date = "Select a date";
        if (!this.state.time1 || !this.state.time2)
            errors.time = "Select a time";

        if (moment(this.state.time1, "HH:mm").hours() > moment(this.state.time2, "HH:mm").hours()) { errors.time = "Invalid time"; }
        if ((moment(this.state.time1, "HH:mm").hours() === moment(this.state.time2, "HH:mm").hours()) && (moment(this.state.time1, "HH:mm").minutes() >= moment(this.state.time2, "HH:mm").minutes())) {
            errors.time = "inValid time";
        }

        return { errors, isValid: isEmpty(errors) };
    }

    resetworkersList() {
        let l = this.state.workers;
        l.map(t => { t.checked = false; t.isPresent = false; return t; })
        this.setState({ workers: l });
    }


    HandleClick(t, index) {
        //console.log(t);
        t.isPresent = !t.isPresent;
        var { workers } = this.state;
        workers[index].isPresent = t.isPresent
        this.setState({
            workers
        })
    }

    HandleChechbox(t, index) {
        t.checked = !t.checked;
        var { workers } = this.state;
        workers[index].checked = t.checked;
        workers[index].isPresent = false;
        this.setState({
            workers
        })
    }


    render() {

        var { errors } = this.state;

        var Listworkers = this.state.workers.map((t, index) =>
            <tr key={t.id} >
                <td><input onChange={this.HandleChechbox.bind(this, t, index)} type="checkbox" className="" checked={t.checked} /></td>
                <td>{t.id}</td>
                <td>{t.firstname}</td>
                <td>{t.surname}</td>
                <td>{t.email}</td>
                <td>
                    <button disabled={!t.checked} onClick={this.HandleClick.bind(this, t, index)} className={"btn " + ((t.isPresent) ? "btn-success" : "btn-danger")}>
                        <i className={((t.isPresent) ? "ion-checkmark-round " : " ion-close-round")}></i>
                    </button>
                </td>
            </tr>

        );

        var errorsView = (!isEmpty(errors)) ? (
            <div className="alert alert-danger">
                <ul>
                    {errors.list && <li>{errors.list}</li>}
                    {errors.date && <li>{errors.date}</li>}
                    {errors.time && <li>{errors.time}</li>}
                </ul>
            </div>
        ) : (<div></div>);

        return (
            <div>
                <LpTitle title='Absences Of workers'></LpTitle>
                <p>Dictas principes pri ea. Ex vim soluta accusam, per in illum liberavisse. Eum viderer saperet adversarium
                    id, erat mazim te est. Adhuc hendrerit disputando duo eu, sed fugit corrumpit efficiantur ex. Eum etiam
                    iudico gubergren eu.</p>


                <table id="ListPresence" className="table" cellSpacing="0" width="100%">
                    <thead>
                        <tr>
                            <th>*</th>
                            <th>#Id</th>
                            <th>firstname</th>
                            <th>surname</th>
                            <th>email</th>
                            <th>Present</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Listworkers}
                    </tbody>
                </table>


                <form className="form-inline form-datetime" onSubmit={this.HandleSubmit.bind(this)}>
                    {errorsView}

                    <SingleDatePicker
                        displayFormat="YYYY-MM-DD"
                        showDefaultInputIcon
                        numberOfMonths={1}
                        daySize={50}
                        date={this.state.date}
                        onDateChange={date => this.setState({ date })}
                        focused={this.state.focused}
                        onFocusChange={({ focused }) => this.setState({ focused })}
                    />
                    <div className="form-group">
                        <TimePicker
                            theme="classic"
                            withoutIcon={true}
                            time={this.state.time1}
                            onTimeChange={time1 => this.setState({ time1 })}
                        />
                    </div>
                    <i className="ion-arrow-right-c" />
                    <div className="form-group">
                        <TimePicker
                            theme="classic"
                            withoutIcon={true}
                            time={this.state.time2}
                            onTimeChange={time2 => this.setState({ time2 })}
                        />
                    </div>
                    <button type="submit" className="btn btn-lg btn-primary">Add</button>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        newlp: bindActionCreators(addListPresenceAction, dispatch),
        getUsersByRole: bindActionCreators(getAllUsersByRole, dispatch),
    }
}

export default connect(null, mapDispatchToProps)(AdminAbsencesOfWorkers);