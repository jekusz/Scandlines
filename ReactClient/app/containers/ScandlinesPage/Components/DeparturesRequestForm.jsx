import React from 'react';
import moment from 'moment'
import './style.scss';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { Form, Text, Scope, Select, Option, asField } from 'informed';


const WrappedDayPicker = asField(({ fieldState, fieldApi, ...props }) => {

	const { value } = fieldState
	const { setValue, setTouched } = fieldApi
	const { onChange, onBlur, ...rest } = props

	return (
		<React.Fragment>

			<DayPickerInput
				dayPickerProps={{ firstDayOfWeek: 1 }}
				onDayChange={day => setValue(day)}
				onBlur={e => setTouched()} />

		</React.Fragment>
	)
});


export default class DeparturesRequestForm extends React.PureComponent {

	render() {
		return (
			<Form onSubmit={(values) => console.log(values)} id='scandlines-form'>
				{({ formState }) => (
					<div>
						<label htmlFor="route">First name:</label>
						<Select field="route" id="route" initialValue='DKROF-DEPUT'>
							<Option value="DKROF-DEPUT">Rodby-Puttgarden</Option>
							<Option value="DEPUT-DKROF">Puttgarden-Rodby</Option>
							<Option value="DKGED-DERSK">Gedser-Rostock</Option>
							<Option value="DERSK-DKGED">Rostock-Gedser</Option>
						</Select>
						<label htmlFor="start-date">Friend 1:</label>
						<WrappedDayPicker field="start-date" id="start-date" />
						<label htmlFor="end-date">Start date</label>
						<Text field="end-date" id="end-date" />
						<label htmlFor="end-date">End date</label>
						<Text field="end-date" id="end-date" />
						<button type="submit">
							Submit
					</button>
						<label>Values:</label>
						<code>{JSON.stringify(formState.values)}</code>
						<label>Touched:</label>
						<code>{JSON.stringify(formState.touched)}</code>
					</div>
				)}

			</Form>
		);
	}
}

