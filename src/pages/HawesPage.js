import React, { memo, useEffect, useMemo, useState } from 'react'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Gif } from '@giphy/react-components'
import { styled } from '@linaria/react'
import { FirebaseDatabaseNode } from '@react-firebase/database'

import hawesLinks from 'data/hawesLinks.json'
import smartassLinks from 'data/smartassLinks.json'

import { Content } from 'components/core/Layout'
import { Subtitle, Title } from 'components/core/Type'
import { Links } from 'components/Links'
import Soundboard from 'components/Soundboard'

const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY)

const HawesPage = () => {
	const [gif, setGif] = useState()
	const [limit /*, setLimit*/] = useState(100)

	useEffect(() => {
		async function fetchData() {
			// const { data: gifs } = await gf.search('great job', { sort: 'relevant', lang: 'en', limit: 10, type: 'gifs' })
			// setGif(gifs[0])
			const { data } = await gf.random({ tag: 'good job', lang: 'en', type: 'gifs' })
			setGif(data)
		}
		fetchData()
	}, [])

	const renderGif = useMemo(() => {
		if (!gif) return null

		const finalGif = gif.images.fixed_height
		return (
			<GifContainer>
				<Gif gif={gif} width={finalGif.width} noLink />
			</GifContainer>
		)
	}, [gif])

	return (
		<>
			<Title>Welcome, Hawes!</Title>
			<Content>
				{/*  */}
				<Subtitle>Recent Feedback</Subtitle>
				<FirebaseDatabaseNode path="feedback/" limitToFirst={limit} orderByValue={'created_on'}>
					{data => {
						const { value } = data

						if (value === null || typeof value === 'undefined') return null

						return (
							<React.Fragment>
								<div>
									{Object.keys(value)
										.reverse()
										.map(key => {
											const feedback = value[key]
											if (!feedback.approved) return null
											return (
												<Feedback.Container key={key}>
													<Feedback.Comment>"{feedback.comment}"</Feedback.Comment>
													<Feedback.Name>{feedback.name}</Feedback.Name>
												</Feedback.Container>
											)
										})}
								</div>
							</React.Fragment>
						)
					}}
				</FirebaseDatabaseNode>

				{/*  */}
				<Subtitle>Moral Support</Subtitle>
				{renderGif}

				{/*  */}
				<Subtitle>Fun Stuff</Subtitle>
				<Soundboard />

				{/*  */}
				<Subtitle>Feel Good Links</Subtitle>
				<Links links={hawesLinks} />

				{/*  */}
				<Subtitle>Smartass Links</Subtitle>
				<Links links={smartassLinks} />
			</Content>
		</>
	)
}

const GifContainer = styled.div`
	display: flex;
	justify-content: center;
`

const Feedback = {}
Feedback.Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 16px 16px;
	border: 1px solid #dedede;
	border-radius: 8px;
	margin: 16px 8px;

	@media (max-width: 420px) {
		flex-direction: column;
	}
`
Feedback.Comment = styled.div`
	flex: 1;
	margin-right: 8px;

	@media (max-width: 420px) {
		margin-right: 0;
		margin-bottom: 8px;
	}
`
Feedback.Name = styled.div`
	flex: 1;
	text-overflow: ellipsis;
	max-width: 150px;
	overflow: hidden;

	@media (max-width: 420px) {
		max-width: unset;
	}
`

export default memo(HawesPage)
