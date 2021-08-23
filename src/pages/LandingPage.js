import React, { memo } from 'react'
import { FirebaseAuthConsumer } from '@react-firebase/auth'

import Button from 'components/core/Button'
import { Content } from 'components/core/Layout'
import { Title } from 'components/core/Type'

// import colors from 'utils/colors'

const LandingPage = () => {
	return (
		<>
			<Title>Are you Hawes?</Title>
			<Content>
				<Button to="/hawes" eventName="hawes">
					Yes
				</Button>
				<Button to="/not-hawes" eventName="not_hawes">
					No
				</Button>

				<FirebaseAuthConsumer>
					{({ isSignedIn }) => {
						return isSignedIn ? (
							<Button to="/admin" eventName="admin">
								Admin
							</Button>
						) : null
					}}
				</FirebaseAuthConsumer>
			</Content>
		</>
	)
}

export default memo(LandingPage)
