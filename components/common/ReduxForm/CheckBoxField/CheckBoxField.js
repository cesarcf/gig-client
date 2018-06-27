import React, { PureComponent } from 'react'
import classNames from 'classnames'



class CheckBoxField extends PureComponent {
	render(){
		const { input, meta: { active, pristine, touched, error, asyncValidating }, label, type, className } = this.props
		return (
			<div className={ classNames(className)}>
				<input
					{...input}
					id={ input.name }
					type={type}
					className={classNames('checkbox', !pristine && touched && (( error && 'error')))}
				/>
				<label for={ input.name }>{label}</label>
			</div>
		)
	}
}


export default CheckBoxField