import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
	static getInitialProps({ renderPage }) {
		// Create an instance of ServerStyleSheet
		const sheet = new ServerStyleSheet();

		// Retrieve styles from components in the page
		const page = renderPage((App) => (props) =>
			sheet.collectStyles(<App {...props} />)
		);

		// Extract the styles as <style> tags
		const styleTags = sheet.getStyleElement();

		// Pass styleTags as a prop
		return { ...page, styleTags };
	}

	render() {
		return (
			<html>
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<link href="/static/min.css" rel="stylesheet" />
					<link
						href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
						rel="stylesheet"
					/>
					{this.props.styleTags}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
