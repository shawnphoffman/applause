import React, { memo } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { FirebaseAuthProvider } from '@react-firebase/auth'
import { FirebaseDatabaseProvider } from '@react-firebase/database'
import * as Sentry from '@sentry/react'
import firebase from 'firebase'
import firebaseAuth from 'firebase/app'

import AdminPage from 'pages/AdminPage'
import HawesPage from 'pages/HawesPage'
import LandingPage from 'pages/LandingPage'
import NotHawesPage from 'pages/NotHawesPage'

import Button from 'components/core/Button'
import { Content } from 'components/core/Layout'
import Error from 'components/Errors/AppError'
import { firebaseConfig } from 'utils/firebaseConfig'

function App() {
	return (
		<Sentry.ErrorBoundary fallback={<Error />}>
			<React.Profiler id="App">
				<FirebaseAuthProvider {...firebaseConfig} firebase={firebaseAuth}>
					<FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
						<Router>
							<Switch>
								<Route path="/" exact>
									<LandingPage />
								</Route>
								<Route>
									<Route path="/hawes">
										<HawesPage />
									</Route>
									<Route path="/not-hawes">
										<NotHawesPage />
									</Route>
									<Route path="/admin">
										<AdminPage />
									</Route>
									<Content>
										<Button to="/" eventName="back">
											Back
										</Button>
									</Content>
								</Route>
							</Switch>
						</Router>
					</FirebaseDatabaseProvider>
				</FirebaseAuthProvider>
			</React.Profiler>
		</Sentry.ErrorBoundary>
	)
}

export default memo(App)
