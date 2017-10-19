import React, { Component } from 'react';
import LpTitle from '../lpTitle';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'react-times';


class AdminAbsencesOfTeachers extends Component {
    constructor() {
        super();
        this.state = {
            date: null,
            time1: null,
            time2: null,
            focused: null,
            teachers: [
                { checked: false, id: 1, firstname: 'fathi', surname: 'lakhdhar', email: 'fathi.lakdhar@yahoo.fr', isPresent: false },
                { checked: true, id: 2, firstname: 'Cristiano', surname: 'Ronaldo', email: 'cristiano@yahoo.fr', isPresent: true }
            ]
        }
    }



    HandleSubmit(e) {
        e.preventDefault();
        var final_list_presence = this.state.teachers.filter(obj => obj.checked);
        console.log(final_list_presence);
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
        this.setState({
            teachers
        })
    }

    render() {

        var ListTeachers = this.state.teachers.map((t, index) =>
            <tr key={t.id} >
                <td><input onChange={this.HandleChechbox.bind(this, t, index)} type="checkbox" className="" checked={t.checked} /></td>
                <td>{t.id}</td>
                <td>{t.firstname}</td>
                <td>{t.surname}</td>
                <td>{t.email}</td>
                <td>
                    <button onClick={this.HandleClick.bind(this, t, index)} className={"btn " + ((t.isPresent) ? "btn-success" : "btn-danger")}>
                        <i className={((t.isPresent) ? "ion-checkmark-round " : " ion-close-round")}></i>
                    </button>
                </td>
            </tr>

        );

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
                    <SingleDatePicker
                        numberOfMonths={1}
                        daySize={50}
                        date={this.state.date}
                        onDateChange={date => this.setState({ date })}
                        focused={this.state.focused}
                        onFocusChange={({ focused }) => this.setState({ focused })}
                    />
                    <div className="form-group">
                        <TimePicker
                            timeMode="12"
                            theme="classic"
                            withoutIcon={true}
                            time={this.state.time1}
                            onTimeChange={time1 => this.setState({ time1 })}
                        />
                    </div>
                    <div className="form-group">
                        <TimePicker
                            timeMode="12"
                            theme="classic"
                            withoutIcon={true}
                            time={this.state.time2}
                            onTimeChange={time2 => this.setState({ time2 })}
                        />
                    </div>
                    <button type="submit" className="btn btn-lg btn-default">Add</button>
                </form>
            </div>
        );
    }
}

export default AdminAbsencesOfTeachers;