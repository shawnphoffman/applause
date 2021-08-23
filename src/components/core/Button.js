import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { styled } from '@linaria/react'
import * as Panelbear from '@panelbear/panelbear-js'

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
`

const StyledButton = styled(Link)`
	border: 2px solid #222;
	margin: 16px;
	font-weight: 700;
	border-radius: 8px;
	background-color: #efefef;
	text-align: center;
	display: inline-block;

	&:hover {
		text-decoration: none;
		background-color: #dedede;
	}

	font-size: ${props => (props.small ? '20px' : '32px')};
	padding: ${props => (props.small ? '8px 16px' : '16px 32px')};
	min-width: ${props => (props.small ? '175px' : '300px')};
`

const Button = ({ eventName, ...rest }) => {
	const handleClick = useCallback(() => {
		if (eventName) {
			Panelbear.track(`Button Click - ${eventName}`)
		}
	}, [eventName])

	const isLink = !!rest.to || !!rest.href

	const as = isLink ? Link : 'div'

	return (
		<Wrapper onClick={handleClick}>
			<StyledButton as={as} {...rest} />
		</Wrapper>
	)
}

export default Button
