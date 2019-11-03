import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class StepHeader extends Component {

    render() {
        return (
            <div className="form-legend" onClick={this.props.clickHandler}>
                <div>{this.props.title}</div>
            </div>
        )
    }
}

class InputComponent extends Component {
    constructor() {
        super();
        this.inputField;
    }

    isValid() {
        if(this.props.phoneNo){
            return /^0\d{10}$/.test(this.inputField.value);
        }
        return this.inputField.reportValidity();
    }

    render() {
        return (
            <div className="text-input-div input-component">
                <label htmlFor={this.props.name}>{this.props.label}</label><br />
                <input className="text-input" type={this.props.type} name={this.props.name}
                    required={this.props.required} id={this.props.name} ref={(elem) => this.inputField = elem} />
            </div>
        )
    }
}

class SelectComponent extends Component {
    constructor() {
        super();
        this.inputField;
    }

    isValid() {
        return this.inputField.reportValidity();
    }

    render() {
        return (
            <div className="input-component" style={{ 'display': 'inline-block' }}>
                <label htmlFor={this.props.name}>{this.props.label}</label><br />
                <select name={this.props.name} required={this.props.required} id={this.props.name}
                    ref={(elem) => this.inputField = elem}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
        )
    }
}

class DateComponent extends Component {
    constructor() {
        super();
        this.date;
        this.month;
        this.year;
    }

    isValid() {
        if (!this.date.reportValidity() || !this.month.reportValidity() || !this.year.reportValidity()) {
            return false;
        }

        let dd = this.date.value;
        let mm = this.month.value;
        let yy = this.year.value;
        let calculatedDate = new Date(yy, mm - 1, dd);

        if (calculatedDate.getDate() != dd || calculatedDate.getMonth() != mm - 1) {
            alert("Date is incorrect!")
            return false;
        } else {
            return true;
        }
    }


    render() {
        return (
            <div className="input-component">
                <label htmlFor={this.props.name}>{this.props.label}</label><br />
                <div className="date">
                    <input className="date-input" type='number' name='date' min='1' max='31'
                        required={this.props.required} id={this.props.name}
                        ref={(elem) => this.date = elem} />
                </div>
                <div className="date">
                    <input className="date-input" type='number' name='month' min='1' max='12'
                        required={this.props.required} id={this.props.name} ref={(elem) => this.month = elem} />
                </div>
                <div className="date">
                    <input className="date-input" type='number' name='year' max='2019'
                        required={this.props.required} id={this.props.name} ref={(elem) => this.year = elem} />
                </div>
            </div>
        )
    }
}

class TextareaComponent extends Component {
    render() {
        return (
            <div>
                <label htmlFor={this.props.name}>{this.props.label}</label><br />
                <textarea rows="10" cols="40" name={this.props.name} required={this.props.required} id={this.props.name} />
            </div>
        )
    }
}

class Step extends Component {

    render() {
        return (
            <div className="step">
                <StepHeader title={this.props.title} clickHandler={this.props.expandHandler} />
                <div className="step-children" hidden={this.props.hidden}>
                    {this.props.children}
                </div>

                <div style={{ 'height': '48px' }} hidden={this.props.hidden}>
                    <button type="submit" value="Next" onClick={this.props.nextExpandHandler}>Next ></button>
                </div>
            </div>
        )
    }
}


export default class UserDetailApp extends Component {

    constructor() {
        super();
        this.state = {
            nowShowing: 0
        }
        this.inputs = {}
    }

    changeVisibleStep(clickedIndex) {
        if (clickedIndex !== this.state.nowShowing) {
            return;
        }
        this.changeNextVisibleStep(clickedIndex);
    }

    validate(stepNo) {
        if (stepNo == 0) {
            return this.inputs.firstName.isValid()
                && this.inputs.lastName.isValid()
                && this.inputs.email.isValid();
        } else if (stepNo == 1) {
            return this.inputs.number.isValid() && this.inputs.gender.isValid() && this.inputs.date.isValid();
        } else if (stepNo == 2) return true;
    }

    changeNextVisibleStep(currentIndex, evt) {
        if (!this.validate(currentIndex)) {
            if(evt) evt.preventDefault();
            return;
        }

        if (currentIndex !== 2) {
            if(evt) evt.preventDefault();
            currentIndex++;
            this.setState({ nowShowing: currentIndex });
        }
        
    }

    render() {
        return (<form action="save-data" method="POST">
            <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').content} />
            <Step title="Step 1: Your Details"
                hidden={this.state.nowShowing !== 0}
                expandHandler={this.changeVisibleStep.bind(this, 0)}
                nextExpandHandler={this.changeNextVisibleStep.bind(this, 0)}>
                <div>
                    <InputComponent type="text" label="First Name" name="first_name" required={true}
                        ref={(elem) => this.inputs.firstName = elem} />
                    <InputComponent type="text" label="Surname" name="surname" required={true}
                        ref={(elem) => this.inputs.lastName = elem} />
                </div>
                <InputComponent type="email" label="Email address" name="email" required={true}
                    ref={(elem) => this.inputs.email = elem} />
            </Step>
            <Step title="Step 2: More Comments" hidden={this.state.nowShowing !== 1}
                expandHandler={this.changeVisibleStep.bind(this, 1)}
                nextExpandHandler={this.changeNextVisibleStep.bind(this, 1)}>
                <div>
                    <InputComponent type="number" label="Telephone Number" name="telephone" required={true}
                        ref={(elem) => this.inputs.number = elem} phoneNo={true} />
                    <SelectComponent label="Gender" name="gender" required={true}
                        ref={(elem) => this.inputs.gender = elem} />
                </div>
                <DateComponent type="number" label="Date Of Birth" name="date_of_birth" required={true}
                    ref={(elem) => this.inputs.date = elem} />
            </Step>
            <Step title="Step 3: Final Comments" hidden={this.state.nowShowing !== 2}
                expandHandler={this.changeVisibleStep.bind(this, 2)} nextExpandHandler={this.changeNextVisibleStep.bind(this, 2)}>
                <TextareaComponent label="Comments" name="comment" required={false} />
            </Step>
        </form>)
    }
}

if (document.getElementById('react-app')) {
    ReactDOM.render(<UserDetailApp />, document.getElementById('react-app'));
}
