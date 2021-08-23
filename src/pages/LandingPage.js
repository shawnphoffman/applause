import React, { memo } from 'react'
import { styled } from '@linaria/react'

import Button from 'components/core/Button'
import { Title } from 'components/core/Type'

// import colors from 'utils/colors'

const Column = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0px 16px;
	/* max-width: 608px; */
	justify-content: center;
	align-items: center;
`

const LandingPage = () => {
	return (
		<Column>
			<Title>Are you Hawes?</Title>
			<Button to="/hawes" eventName="hawes">
				Yes
			</Button>
			<Button to="/not-hawes" eventName="not_hawes">
				No
			</Button>
		</Column>
	)
}

export default memo(LandingPage)
