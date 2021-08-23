import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { styled } from '@linaria/react'
import * as Panelbear from '@panelbear/panelbear-js'

const StyledButton = styled(Link)`
	padding: 16px 32px;
	/* border: 0px; */
	border: 2px solid #222;
	margin: 16px;
	font-weight: 700;
	font-size: 32px;
	border-radius: 8px;
	min-width: 300px;
	background-color: #efefef;
	text-align: center;
	display: inline-block;

	&:hover {
		text-decoration: none;
		background-color: #dedede;
	}
`

const Button = ({ eventName, ...rest }) => {
	const handleClick = useCallback(() => {
		if (eventName) {
			Panelbear.track(`Button Click - ${eventName}`)
		}
	}, [eventName])
	return (
		<div onClick={handleClick}>
			<StyledButton {...rest} />
		</div>
	)
}

export default Button
