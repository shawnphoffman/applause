import React, { memo } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import * as Sentry from '@sentry/react'

import HawesPage from 'pages/HawesPage'
import LandingPage from 'pages/LandingPage'
import NotHawesPage from 'pages/NotHawesPage'

import Error from 'components/Errors/AppError'

function App() {
	return (
		<Sentry.ErrorBoundary fallback={<Error />}>
			<React.Profiler id="App">
				<Router>
					<Switch>
						<Route path="/hawes">
							<HawesPage />
						</Route>
						<Route path="/not-hawes">
							<NotHawesPage />
						</Route>
						<Route path="/">
							<LandingPage />
						</Route>
					</Switch>
				</Router>
			</React.Profiler>
		</Sentry.ErrorBoundary>
	)
}

export default memo(App)
