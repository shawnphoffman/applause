import React, { memo } from 'react'
import { styled } from '@linaria/react'

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

const HawesPage = () => {
	return (
		<Column>
			<Title>You are Hawes</Title>
		</Column>
	)
}

export default memo(HawesPage)
