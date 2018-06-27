import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { signOut } from '../../actions/auth'
import { getUserProfile } from '../../actions/user'


class Header extends Component {

	state = {
		toogleAccount: false
	}

	onClickLogout = (event) => {
		event.preventDefault()
		this.props.signOut()
	}

	renderButtons = (authenticated) => {

		if (authenticated) {
			return (
				<Fragment>
				<li>
					<p><span className="icon-awesome-dashboard"></span>Go to my Account!</p>
					<Link to={{ pathname:'/dashboard' }}>Dashboard</Link>
				</li>
				<li>
					<p><span className="icon-awesome-sign-out"></span>Sign Out of my Account!</p>
					<Link to={{ pathname:'/' }} onClick={this.onClickLogout}>Logout</Link>
				</li>
				</Fragment>
			)
		} else {
			return (
				<Fragment>
					<li>
						<p><span className="icon-awesome-user"></span>Create an Account!</p>
						<Link to={{ pathname:'/signup' }}>SignUp</Link>
					</li>
					<li>
						<p><span className="icon-awesome-sign-in"></span>Log in into your Account!</p>
						<Link to={{ pathname:'/signin' }}>SignIn</Link>
					</li>
				</Fragment>
			)
		}

	}

	onToogleAccount = () => {
		this.setState(prevState => ({
			toogleAccount: !prevState.toogleAccount
		}));
	}


	render(){
		const { authenticated, user } = this.props
		return (
			<Fragment>
				<div className='header'>
					<div className='logo'>
						<h3>AddressBook</h3>
					</div>

					<div className='account' onClick={this.onToogleAccount} onMouseEnter={this.onToogleAccount} onMouseLeave={this.onToogleAccount}>
						<p className='account-user'>{authenticated && user ? `Welcome, ${user.firstName}` : 'Hello, Signin!' }</p>
						<Link to='#' className={user ? 'open' : 'close'}>MY ACCOUNT <span className="icon-awesome-caret-down"></span></Link>
						{
							this.state.toogleAccount &&
							<ul className='nav-links'>
								{this.renderButtons(authenticated)}
							</ul>
						}

					</div>
				</div>
			</Fragment>
		)
	}

}


const mapStateToProps = ({ auth, user }) => {
	return {
		authenticated: auth.authenticated,
		user
	}
}

export default compose(
	connect(mapStateToProps, { signOut, getUserProfile })
)(Header)


