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
					<React.Fragment>
						<label htmlFor="route"><span>Route:</span>
							<Select className="select-field" field="route" id="route" initialValue='DKROF-DEPUT'>
								<Option value="DKROF-DEPUT">Rodby-Puttgarden</Option>
								<Option value="DEPUT-DKROF">Puttgarden-Rodby</Option>
								<Option value="DKGED-DERSK">Gedser-Rostock</Option>
								<Option value="DERSK-DKGED">Rostock-Gedser</Option>
							</Select>
						</label>
						<label htmlFor="start-date">
							<span>From:</span><WrappedDayPicker field="start-date" id="start-date" className='input-field' />
						</label>
						<label htmlFor="end-date">
							<span>To:</span><WrappedDayPicker field="end-date" id="end-date" />
						</label>
						<button type="submit">
							Load
						</button>
						{/* <label>Values:</label>
						<code>{JSON.stringify(formState.values)}</code>
						<label>Touched:</label>
						<code>{JSON.stringify(formState.touched)}</code> */}
					</React.Fragment>
				)}

			</Form>
		);
	}
}

