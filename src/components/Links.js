import React, { memo } from 'react'
import { styled } from '@linaria/react'

import { H3 } from './core/Type'

export const Links = memo(({ links }) => {
	return (
		<LinkList>
			{links.map(link => (
				<Link key={link.title}>
					<a href={link.href} target="_blank" rel="noreferrer">
						{link.title}
					</a>
				</Link>
			))}
		</LinkList>
	)
})

const Link = styled.div`
	padding: 8px 0px;
	margin-left: 8px;
`
const LinkList = styled.div``

export const LinkGroups = ({ groups }) => {
	return (
		<div>
			{groups.map(group => (
				<React.Fragment key={group.title}>
					<H3>{group.title}</H3>
					<Links links={group.links} />
				</React.Fragment>
			))}
		</div>
	)
}
