import React, { Fragment } from 'react'
import classNames from 'classnames'


const Button = ({ type, className, ...props }) => {

	return (
		<button
			{...props}
			type={props.type}
			className={classNames('btn-primary', className)}
		>
		{props.children}
		</button>


	)
}

Button.defaultProps = {
	type:'submit',
	className: 'btn-block'
};

export default Button