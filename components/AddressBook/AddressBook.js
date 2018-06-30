import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Route, Link, Switch, withRouter } from 'react-router-dom'
import { loadAddressBook, deleteContact } from '../../actions/addressBook'
import EditAddressBook from './EditAddressBook'


class AddressBook extends React.Component {

	handleDelete = (event, _id=null) => {
		event.preventDefault()
		this.props.deleteContact(_id)
	}

	renderListContact = (addressBook) => {
		const { match } = this.props
		return (
			<Fragment>
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
										<Link to={{ pathname:`${match.url}/edit`, state:{ _id }}}>
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
					<Link to={{ pathname:`${match.url}/edit`, state:{ _id:undefined }}}>
						Create a new Contact:  <span className="icon-awesome-plus-circle"></span>
					</Link>
				</div>
			</Fragment>
		)
	}


	render(){
		const { addressBook, match } = this.props
		return (
			<Fragment>
				<div className='address-book'>
					<h2>Address Book</h2>
					<Switch>
						<Route exact path={`${match.url}`} render={() => this.renderListContact(addressBook) }/>
						<Route path={`${match.url}/:edit`} render={(props) => <EditAddressBook {...props} addressBook={addressBook} /> }/>
					</Switch>
				</div>
			</Fragment>
		)
	}


	componentDidMount(){
		/* Solo llamamos a la API una vez */
		if (this.props.addressBook === undefined || this.props.addressBook.length == 0) {
			this.props.loadAddressBook()
		}
	}
}

const mapStateToProps = ({ addressBook }) => {
	return {
		addressBook
	}
}


export default compose(
	connect(mapStateToProps, { loadAddressBook, deleteContact }),
	withRouter
)(AddressBook)