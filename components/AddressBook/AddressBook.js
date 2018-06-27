import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { loadAddressBook, deleteContact } from '../../actions/addressBook'
import EditAddressBook from './EditAddressBook'


class AddressBook extends React.Component {
	state = {
		currentContact: null
	}


	handleEdit = (event, _id=null) => {
		event.preventDefault()
		const { addressBook } = this.props
		const currentContact = addressBook.find(contact => contact._id == _id)
		this.setState({ currentContact })
	}

	handleDelete = (event, _id=null) => {
		event.preventDefault()
		this.props.deleteContact(_id)
	}

	handleNew = (event) => {
		event.preventDefault()
		this.setState({ currentContact: null })
	}


	render(){
		const { addressBook, match } = this.props
		return (
			<Fragment>
			<div className='address-book'>
				<h2>Address Book</h2>
				<p>This is your current list of contacts:</p>
				<div className='contacts'>
				{ addressBook.length == 0
					? (
						<div className='void'>
							<p>empty!</p>
						</div>
						)
					: (
						addressBook.map(contact => {
							let { _id, firstName, lastName, email, country } = contact
							return (
								<div className='contact'>
									<div className='contact-info'>
										<p>{`${country} - ${firstName} ${lastName} - ${email}`}</p>
									</div>
									<div className='contact-btns'>
										<Link to='' onClick={ (event) => this.handleEdit(event, _id) }>
											<span className="icon-awesome-pencil-square-o"></span>
										</Link>
										<Link to='' onClick={ (event) => this.handleDelete(event, _id) }>
											<span className="icon-awesome-trash-o"></span>
										</Link>
									</div>
								</div>
							)
						})
						)
				}
				</div>
				<div className='btns-add'>
					<Link to='' onClick={ this.handleNew }>
						Create a new Contact:  <span className="icon-awesome-plus-circle"></span>
					</Link>
				</div>
				<EditAddressBook {...this.state.currentContact} />

			</div>
			</Fragment>
		)
	}

	componentDidMount(){
		this.props.loadAddressBook()
	}
}

const mapStateToProps = ({ addressBook }) => {
	return {
		addressBook
	}
}


export default compose(
	connect(mapStateToProps, { loadAddressBook, deleteContact })
)(AddressBook)