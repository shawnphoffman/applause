import React, { memo, /*useCallback,*/ useEffect, useMemo, useState } from 'react'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Gif } from '@giphy/react-components'
import { styled } from '@linaria/react'
import { FirebaseDatabaseNode } from '@react-firebase/database'

import hawesLinks from 'data/hawesLinks.json'
import smartassLinks from 'data/smartassLinks.json'

// import Button from 'components/core/Button'
import { Content } from 'components/core/Layout'
import { Subtitle, Title } from 'components/core/Type'
import { Links } from 'components/Links'

const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY)

const HawesPage = () => {
	const [gif, setGif] = useState()
	const [limit /*, setLimit*/] = useState(50)

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

	// const handleLoadMore = useCallback(() => {
	// 	setLimit(prev => prev + 2)
	// }, [])

	return (
		<>
			<Title>Welcome, Hawes!</Title>
			<Content>
				{/*  */}
				<Subtitle>Recent Feedback</Subtitle>
				<FirebaseDatabaseNode path="feedback/" limitToFirst={limit} orderByValue={'created_on'}>
					{data => {
						const {
							value,
							// isLoading
						} = data

						// if (isLoading) return <div>LOADING</div>

						if (value === null || typeof value === 'undefined') return null

						return (
							<React.Fragment>
								<div>
									{Object.keys(value).map(key => {
										return (
											<Feedback.Container key={key}>
												<Feedback.Comment>"{value[key].comment}"</Feedback.Comment>
												<Feedback.Name>{value[key].name}</Feedback.Name>
											</Feedback.Container>
										)
									})}
								</div>
								{/* <Button onClick={handleLoadMore} small>
									Load more
								</Button> */}
							</React.Fragment>
						)
					}}
				</FirebaseDatabaseNode>

				{/*  */}
				<Subtitle>Moral Support</Subtitle>
				{renderGif}

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
	padding: 16px 8px;
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
