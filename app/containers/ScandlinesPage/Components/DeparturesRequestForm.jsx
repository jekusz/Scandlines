import React from 'react';
import moment from 'moment'
import './style.scss';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { Form, Text, Scope, Select, Option, asField } from 'informed';


const WrappedDayPicker = asField(({ fieldState, fieldApi, ...props }) => {

	const { value } = fieldState
	const { setValue, setTouched } = fieldApi
	const { from, to, onChange, onBlur, className, ...rest } = props


	const onDayChange = day => {
		setValue(new Date(day.getFullYear(), day.getMonth(), day.getDate()))
	};
	return (
		<React.Fragment>
			<DayPickerInput
				inputProps={{ className: "input-field" }}
				dayPickerProps={{
					firstDayOfWeek: 1,
					disabledDays: {
						before: (from || new Date()),
						after: to
					}
				}}
				onDayChange={onDayChange}
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

export default class DeparturesRequestForm extends React.PureComponent {

	render() {
		return (
			<Form onSubmit={this.onSubmit()} id='scandlines-form'>
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
							<span>From:</span><WrappedDayPicker validate={validateFrom} to={formState.values.toDate} field="fromDate" id="fromDate" />
							<span> 00:00</span>
						</label>
						<label htmlFor="toDate">
							<span>To:</span><WrappedDayPicker validate={validateTo} from={formState.values.fromDate} field="toDate" id="toDate" />
							<span> 24:00</span>
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

	onSubmit() {
		return (formValues) => {
			return this.props.onLoadDepartures({
				fromDate: moment(formValues.fromDate),
				toDate: moment(formValues.toDate),
				route: formValues.route
			})
		};
	}
}

