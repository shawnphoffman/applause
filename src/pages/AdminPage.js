import 'firebase/auth'

import React, { memo, useCallback } from 'react'
import { styled } from '@linaria/react'
import { FirebaseAuthConsumer } from '@react-firebase/auth'
import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from '@react-firebase/database'

import Button from 'components/core/Button'
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
							const { displayName, uid } = user
							return (
								<>
									<Subtitle>Hello, {displayName}</Subtitle>
									{/* TODO - Change this to use rules */}
									{uid === 'FARYKJpqquOyWIjBkAnq7dxe3262' && <FeedbackApprovals />}
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
									<Button
										small
										onClick={() => {
											const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
											firebase.auth().signInWithPopup(googleAuthProvider)
										}}
									>
										Sign in with Google
									</Button>
								</>
							)
						}
					}}
				</FirebaseAuthConsumer>
			</Content>
		</>
	)
}

const FeedbackApprovals = () => {
	const RejectFeedback = useCallback(async (key, feedback, runMutation) => {
		console.log('Reject', key)
		await runMutation({
			[key]: {
				...feedback,
				approved: false,
			},
		})
	}, [])

	const ApproveFeedback = useCallback(async (key, feedback, runMutation) => {
		console.log('Approve', key)
		await runMutation({
			[key]: {
				...feedback,
				approved: true,
			},
		})
	}, [])
	return (
		<FirebaseDatabaseMutation type="update" path="feedback">
			{({ runMutation }) => (
				<FirebaseDatabaseNode path="feedback/" orderByValue={'created_on'}>
					{data => {
						const { value } = data

						if (value === null || typeof value === 'undefined') return null

						return (
							<React.Fragment>
								<div>
									{Object.keys(value).map(key => {
										const feedback = value[key]
										// if (feedback.approved) return null
										return (
											<Feedback.Container key={key}>
												<Feedback.Comment>"{feedback.comment}"</Feedback.Comment>
												<Feedback.Name>{feedback.name}</Feedback.Name>
												<Feedback.Name>Approved: {feedback.approved.toString()}</Feedback.Name>
												<Feedback.ActionWrapper>
													<Button onClick={() => RejectFeedback(key, feedback, runMutation)} small>
														Reject
													</Button>
													<Button onClick={() => ApproveFeedback(key, feedback, runMutation)} small>
														Approve
													</Button>
												</Feedback.ActionWrapper>
											</Feedback.Container>
										)
									})}
								</div>
							</React.Fragment>
						)
					}}
				</FirebaseDatabaseNode>
			)}
		</FirebaseDatabaseMutation>
	)
}

const Feedback = {}
Feedback.Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 16px 8px;
	border: 1px solid #dedede;
	border-radius: 8px;
	margin: 16px 8px;
`
Feedback.Comment = styled.div`
	flex: 1;
	margin-bottom: 8px;
`
Feedback.Name = styled.div`
	flex: 1;
	text-overflow: ellipsis;
	overflow: hidden;
`
Feedback.ActionWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`

export default memo(AdminPage)
