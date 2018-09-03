import React from 'react';
import moment from 'moment'
import './style.scss';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { Form, Text, Scope, Select, Option, asField } from 'informed';


const WrappedDayPicker = asField(({ fieldState, fieldApi, ...props }) => {

	const { value } = fieldState
	const { setValue, setTouched } = fieldApi
	const { onChange, onBlur, className, ...rest } = props

	return (
		<React.Fragment>
			<DayPickerInput
				inputProps={{ className: "input-field" }}
				dayPickerProps={{
					firstDayOfWeek: 1,
					disabledDays: { before: new Date() }
				}}
				onDayChange={day => setValue(day)}
				onBlur={e => setTouched()} />
		</React.Fragment>
	)
});

const validateFrom = (value, values) => {
	return !values || moment(values.fromDate).isAfter(moment(values.toDate)) ? 'To date must be after From date' : null;
}

const validateTo = (value, values) => {
	return null
}

const requestDepartures = (values) => {

}

export default class DeparturesRequestForm extends React.PureComponent {

	render() {
		return (
			<Form onSubmit={(formValues) => this.props.onLoadDepartures(formValues)} id='scandlines-form'>
				{({ formState }) => (
					<React.Fragment>
						<label htmlFor="route"><span>Route:</span>
							<Select className="select-field" field="route" id="route" initialValue='DKROF-DEPUT'>
								<Option value="DKROF-DEPUT">Rodby-Puttgarden</Option>
								<Option value="DEPUT-DKROF">Puttgarden-Rodby</Option>
								<Option value="DKGED-DERSK">Gedser-Rostock</Option>
								<Option value="DERSK-DKGED">Rostock-Gedser</Option>
							</Select>
						</label>
						<label htmlFor="fromDate">
							<span>From:</span><WrappedDayPicker validate={validateFrom} field="fromDate" id="fromDate" className='input-field' />
						</label>
						<label htmlFor="toDate">
							<span>To:</span><WrappedDayPicker validate={validateTo} field="toDate" id="toDate" />
						</label>
						<button type="submit">
							Load
						</button>
						{Object.keys(formState.errors).length !== 0 && 
						<React.Fragment>
							{Object.values(formState.errors).map((msg, id) => {
								console.log(formState.errors);
								return (
									<div id={id} className="error-msg">
										<i className="fa fa-times-circle"></i>
										{msg}
									</div>
								)
							})
							}
						</React.Fragment>
						}
					</React.Fragment>
				)}
			</Form>
		);
	}
}

