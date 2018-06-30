import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import Header from './Header'
import Dashboard from './Dashboard'
import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'
import requireAuth from './hoc/requireAuth'
import redirectDashboard from './hoc/redirectDashboard'
import AddressBook from './AddressBook'

import '../css/main.styl'

class App extends Component {
	render(){
		return (
			<Fragment>
				<Header />
				<Route path='/signup' component={redirectDashboard(SignUp)} />
				<Route path='/signin' component={redirectDashboard(SignIn)} />
				<Route path='/dashboard' component={requireAuth(Dashboard)} />
				<Route path='/address-book' component={requireAuth(AddressBook)} />
			</Fragment>
		)
	}
}

export default App