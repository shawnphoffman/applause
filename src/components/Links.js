import React, { memo } from 'react'

import { H3 } from './core/Type'

export const Links = memo(({ links }) => {
	return (
		<ul>
			{links.map(link => (
				<li key={link.title}>
					<a href={link.href} target="_blank" rel="noreferrer">
						{link.title}
					</a>
				</li>
			))}
		</ul>
	)
})

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
