import React, { memo } from 'react'
import { styled } from '@linaria/react'

import externalLinks from 'components/externalLinks.json'
import { LinkGroups } from 'components/Links'

const Column = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0px 16px;
	justify-content: center;
	align-items: center;
`

const Title = styled.h1`
	font-size: 96px;
	letter-spacing: 4px;
	text-align: center;
`

const NotHawesPage = () => {
	return (
		<Column>
			<Title>You are not Hawes</Title>
			<h2>Links</h2>
			<LinkGroups groups={externalLinks} />
		</Column>
	)
}

export default memo(NotHawesPage)
