import React, { memo, useCallback } from 'react'
import { styled } from '@linaria/react'
import * as Panelbear from '@panelbear/panelbear-js'

import { H3 } from './core/Type'

export const Links = memo(({ links }) => {
	const handleClick = useCallback(name => {
		Panelbear.track(`link_${name.replace(/\s/g, '_')}`)
	}, [])
	return (
		<LinkList>
			{links.map(link => (
				<Link key={link.title} onClick={() => handleClick(link.title)}>
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
	font-size: 20px;
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
