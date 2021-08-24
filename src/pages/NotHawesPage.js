import React, { memo, useCallback, useRef } from 'react'
import { styled } from '@linaria/react'
import { FirebaseDatabaseMutation } from '@react-firebase/database'
import firebase from 'firebase'

import externalLinks from 'data/externalLinks.json'

import Button from 'components/core/Button'
import { Input, InputGroup, Label } from 'components/core/Input'
import { Content } from 'components/core/Layout'
import { Subtitle, Title } from 'components/core/Type'
import { LinkGroups } from 'components/Links'

const Form = styled.form`
	display: block;
	flex-direction: column;
`

const NotHawesPage = () => {
	const commentFieldRef = useRef()
	const nameFieldRef = useRef()

	const handleSubmit = useCallback(
		runMutation => async ev => {
			ev.preventDefault()
			await runMutation({
				comment: commentFieldRef.current.value,
				name: nameFieldRef.current.value,
				created_at: firebase.database.ServerValue.TIMESTAMP,
				updated_at: firebase.database.ServerValue.TIMESTAMP,
			})
			commentFieldRef.current.value = ''
			nameFieldRef.current.value = ''
		},
		[]
	)

	return (
		<>
			<Title>Team Hawes</Title>
			<Content>
				{/*  */}
				<Subtitle>Leave Feedback for Hawes</Subtitle>
				<FirebaseDatabaseMutation type="push" path="feedback">
					{({ runMutation }) => (
						<Form onSubmit={handleSubmit(runMutation)}>
							{/*  */}
							<InputGroup>
								<Label htmlFor="comment">Comment</Label>
								<Input type="text" id="comment" name="comment" placeholder="Put something nice here" ref={nameFieldRef} required />
							</InputGroup>
							{/*  */}
							<InputGroup>
								<Label htmlFor="name">Name</Label>
								<Input type="text" id="name" name="name" placeholder="Who are you?" ref={commentFieldRef} required />
							</InputGroup>
							{/*  */}
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
