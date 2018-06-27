import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'
import { cleanError } from '../../../../actions/auth'
import classNames from 'classnames'


class InputField extends PureComponent {
	render(){
		const { input, meta: { active, pristine, touched, error, asyncValidating }, placeholder, type } = this.props

		return (
			<Fragment>
				<div className={ classNames(asyncValidating && 'async-validating')}>
					<input
						{...input}
						placeholder={placeholder}
						type={type}
						autocomplete='off'
						className={classNames('form-control', !pristine && touched && (( error && 'error')))}
					/>
				</div>

				{ active && touched && error &&
					<div className='field-error'>
						<span className='error'>{error}</span>
					</div>
				}
			</Fragment>
		)
	}
}


export default connect(null, {cleanError})(InputField)

