import React, { memo, useRef } from 'react'
import { styled } from '@linaria/react'
import { FirebaseDatabaseMutation } from '@react-firebase/database'
import firebase from 'firebase'
import get from 'lodash.get'
import set from 'lodash.set'

import externalLinks from 'data/externalLinks.json'

import Button from 'components/core/Button'
import { Content } from 'components/core/Layout'
import { Subtitle, Title } from 'components/core/Type'
import { LinkGroups } from 'components/Links'

const Form = styled.form`
	display: flex;
	flex-direction: column;
`

const NotHawesPage = () => {
	const newCommentFieldRef = useRef()
	return (
		<>
			<Title>Team Hawes</Title>
			<Content>
				{/*  */}
				<Subtitle>Leave Feedback for Hawes</Subtitle>
				<FirebaseDatabaseMutation type="push" path="feedback">
					{({ runMutation }) => (
						<Form
							onSubmit={async ev => {
								ev.preventDefault()
								const newComment = get(newCommentFieldRef, 'current.value', '')
								await runMutation({
									comment: newComment,
									created_at: firebase.database.ServerValue.TIMESTAMP,
									updated_at: firebase.database.ServerValue.TIMESTAMP,
								})
								set(newCommentFieldRef, 'current.value', '')
							}}
						>
							<label htmlFor="comment">Comment</label>
							<input id="comment" name="comment" ref={newCommentFieldRef} />
							<br />
							<Button type="submit" small>
								Submit
							</Button>
						</Form>
					)}
				</FirebaseDatabaseMutation>
				{/*  */}
				<Subtitle>Useful Links</Subtitle>
				<LinkGroups groups={externalLinks} />
			</Content>
		</>
	)
}

export default memo(NotHawesPage)
