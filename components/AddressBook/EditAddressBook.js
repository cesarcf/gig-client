import React, { PureComponent, Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { updateContact, addContact } from '../../actions/addressBook'
import classNames from 'classnames'
import InputField from '../common/formik/InputField'
import SelectField from '../common/formik/SelectField'
import Button from '../common/Button'
import requireAuth from '../hoc/requireAuth'
import * as yup from 'yup'
const countries = require('country-list')()
const paises = countries.getNames()



class EditAddressBook extends PureComponent {

	render(){
		if(!this.props.authenticated){
			return <div />
		}

		const { addressBook, location, updateContact, addContact } = this.props
		const contact = (location.state._id == undefined)
			?	{_id:null, firstName:'', lastName:'', email:'', country:''}
			: addressBook.find(contact => contact._id == location.state._id)

		return (
			<Fragment>
			<div className='edit-address-book'>
			<h3>Create or Update a Contact:</h3>

			<Formik
				enableReinitialize={true}

				initialValues={{
					_id: contact._id || null,
					firstName: contact.firstName || '',
					lastName: contact.lastName || '',
					email: contact.email || '',
					country: contact.country || ''
				}}

				validationSchema={yup.object().shape({
					firstName: yup.string('Only Text is allowed!').required('The FirstName is required!'),
					lastName: yup.string('Only Text is allowed!').required('The LastName is required!'),
					email: yup.string().email('The Email is invalid!').required('The Email is required!'),
					country: yup.string().required('The Country is required!')
				})}

				onSubmit={(values, {resetForm, setErrors, setSubmitting, setTouched}) => {
					if(values._id == null){
						addContact(values) //action-creator
						resetForm()
					}else {
						updateContact(values) //action-creator
					}

					setSubmitting(false)
					this.props.history.push('/address-book')
				}}

				render={({ dirty, isSubmitting }) => (
					<Form>
						<Field name='firstName' component={InputField} placeholder='FirstName' />
						<Field name='lastName' component={InputField} placeholder='LastName' />
						<Field name='email' component={InputField} placeholder='Email' />
						<Field name='country' component={SelectField}>
							<option value=''>Select your Country...</option>
							{paises.map((country, index) => {
								return <option key={index} value={country}>{country}</option>
							})}
						</Field>
						<Button disabled={!dirty || isSubmitting}>Save Contact!</Button>
						<button type='button' className='btn btn-block btn-link' onClick={ () => this.props.history.goBack() }>Go Back!</button>
					</Form>
				)}
			/>{/* Fin de Formik */}

			</div>
			</Fragment>
		)
	}

}



export default compose(
	connect(null, {updateContact, addContact})
)(requireAuth(EditAddressBook))