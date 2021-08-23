import 'firebase/auth'

import React, { memo, useRef } from 'react'
import { FirebaseAuthConsumer } from '@react-firebase/auth'

import Button from 'components/core/Button'
// import get from 'lodash.get'
// import set from 'lodash.set'
import { Content } from 'components/core/Layout'
import { Subtitle, Title } from 'components/core/Type'

const AdminPage = () => {
	return (
		<>
			<Title>Admin</Title>
			<Content>
				<FirebaseAuthConsumer>
					{({ isSignedIn, firebase, user }) => {
						if (isSignedIn === true) {
							console.log({ user })
							const { displayName, photoURL, uid } = user
							return (
								<>
									<Subtitle>Hello, {displayName}</Subtitle>
									<img src={photoURL} alt="" />
									{/* TODO - Change this to use rules */}
									{uid === 'FARYKJpqquOyWIjBkAnq7dxe3262' && <h3>ADMIN SHIT</h3>}
									<Button
										onClick={() => {
											firebase.app().auth().signOut()
										}}
									>
										Sign out
									</Button>
								</>
							)
						} else {
							return (
								<>
									<Subtitle>Sign-in to Continue</Subtitle>
									<Button
										onClick={() => {
											const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
											firebase.auth().signInWithPopup(googleAuthProvider)
										}}
									>
										Sign in with Google
									</Button>
									{/* <button
										onClick={() => {
											firebase.app().auth().signInAnonymously()
										}}
									>
										Sign in anonymously
									</button> */}
								</>
							)
						}
					}}
				</FirebaseAuthConsumer>
			</Content>
		</>
	)
}

export default memo(AdminPage)
