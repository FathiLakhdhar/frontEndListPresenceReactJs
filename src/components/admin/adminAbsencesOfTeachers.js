import React, { Component } from 'react';
import LpTitle from '../lpTitle';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'react-times';
import { isEmpty } from 'lodash';
import * as moment from 'moment';


class AdminAbsencesOfTeachers extends Component {
    constructor() {
        super();
        this.state = {
            errors: {},
            date: moment(),
            time1: moment().format("HH:mm"),
            time2: moment().add(1, 'hours').format("HH:mm"),
            focused: null,
            teachers: [
                { checked: false, id: 1, firstname: 'fathi', surname: 'lakhdhar', email: 'fathi.lakdhar@yahoo.fr', isPresent: false },
                { checked: true, id: 2, firstname: 'Cristiano', surname: 'Ronaldo', email: 'cristiano@yahoo.fr', isPresent: true }
            ],
        }
    }



    HandleSubmit(e) {
        e.preventDefault();
        this.setState({ errors: {} });
        var list = this.filterByChecked();
        const { errors, isValid } = this.isValid(list);
        console.log(isValid);
        if (isValid) {
            //Action 

        } else {
            this.setState({ errors });
        }

        console.log(this.state);

    }

    filterByChecked() { return this.state.teachers.filter(obj => obj.checked); }

    isValid(list) {
        var errors = {};
        if (isEmpty(list))
            errors.list = "List presence is Empty";
        if (!this.state.date)
            errors.date = "Select a date";
        if (!this.state.time1 || !this.state.time2)
            errors.time = "Select a time";

        if (moment(this.state.time1, "HH:mm").hours() > moment(this.state.time2, "HH:mm").hours()) { errors.time = "Invalid time"; }
        if ( (moment(this.state.time1, "HH:mm").hours() === moment(this.state.time2, "HH:mm").hours()) && (moment(this.state.time1, "HH:mm").minutes() >= moment(this.state.time2, "HH:mm").minutes()) ){
            errors.time = "inValid time";
        }

            return { errors, isValid: isEmpty(errors) };
    }


    HandleClick(t, index) {
        //console.log(t);
        t.isPresent = !t.isPresent;
        var { teachers } = this.state;
        teachers[index].isPresent = t.isPresent
        this.setState({
            teachers
        })
    }

    HandleChechbox(t, index) {
        t.checked = !t.checked;
        var { teachers } = this.state;
        teachers[index].checked = t.checked;
        teachers[index].isPresent = false;
        this.setState({
            teachers
        })
    }


    render() {

        var { errors } = this.state;

        var ListTeachers = this.state.teachers.map((t, index) =>
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
                <LpTitle title='Absences Of Teachers'></LpTitle>
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
                        {ListTeachers}
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

export default AdminAbsencesOfTeachers;