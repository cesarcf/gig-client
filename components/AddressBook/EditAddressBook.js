import React, { Component, Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFormik, Form, Field } from 'formik'
import { updateContact, addContact } from '../../actions/addressBook'
import classNames from 'classnames'
import * as yup from 'yup'
const countries = require('country-list')()
const paises = countries.getNames()


class EditAddressBook extends Component {

	render(){
		const { dirty, handleChange, errors, touched, isSubmitting } = this.props

		return (
			<div className='edit-address-book'>
			<h3>Create or Update a Contact:</h3>
			<Form>
				<div>
				<Field type='text' name='firstName' placeholder='FirstName' className={classNames('form-control', touched.firstName && errors.firstName && 'error')} />
				</div>
				{
					touched.firstName && errors.firstName &&
					<div className='field-error'>
						<span className='error'>{errors.firstName}</span>
					</div>
				}
				<div>
				<Field type='text' name='lastName' placeholder='LastName' className={classNames('form-control', touched.lastName && errors.lastName && 'error')}  />
				</div>
				{
					touched.lastName && errors.lastName &&
					<div className='field-error'>
						<span className='error'>{errors.lastName}</span>
					</div>
				}
				<div>
				<Field type='text' name='email' placeholder='Email' className={classNames('form-control', touched.email && errors.email && 'error')} />
				</div>
				{
					touched.email && errors.email &&
					<div className='field-error'>
						<span className='error'>{errors.email}</span>
					</div>
				}
				<div>
				<Field component='select' name='country' className={classNames('form-control', touched.country && errors.country && 'error')}>
					<option value=''>Select your Country...</option>
					{paises.map((country, index) => {
						return <option key={index} value={country}>{country}</option>
					})}
				</Field>
				</div>
				{
					touched.country && errors.country &&
					<div className='field-error'>
						<span className='error'>{errors.country}</span>
					</div>
				}
				<button className='btn-primary btn-block' type='submit' disabled={!dirty || isSubmitting}>Save Contact!</button>
			</Form>

			</div>
		)
	}

}



export default compose(
	connect(null, {updateContact, addContact}),
	withFormik({
		displayName: 'upsertForm',
		enableReinitialize: true,
		mapPropsToValues({ _id, firstName, lastName, email, country }){
			return {
				_id: _id || null,
				firstName: firstName || '',
				lastName: lastName || '',
				email: email || '',
				country: country || ''
			}
		},

		validationSchema: yup.object().shape({
			firstName: yup.string('Only Text is allowed!').required('The FirstName is required!'),
			lastName: yup.string('Only Text is allowed!').required('The LastName is required!'),
			email: yup.string().email().required('The Email is required!'),
			country: yup.string().required('The Country is required!')
		}),

		handleSubmit(values, { props, resetForm, setErrors, setSubmitting}){
			if(values._id == null){
				props.addContact(values)
				resetForm()
			}else {
				props.updateContact(values)
			}
			setSubmitting(false)
		}

	})
)(EditAddressBook)