import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'


class Dashboard extends Component {

	render(){
		return (
			<Fragment>
				<br />
				<br />
				<br />
				<br />
				<br />
				<Link to={{pathname:'/address-book'}}>AddressBook</Link>
			</Fragment>
		)
	}
}

export default Dashboard