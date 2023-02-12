import React from 'react';
import { ApiError } from '../../api/config';

interface Props {
	error?: ApiError;
	message?: React.ReactNode;
}

export default function ShowError({ error, message }: Props): JSX.Element {
	if (!error || !error.data || !error.data.message) {
		return <>{message}</>;
	}

	if (typeof error.data.message === 'string') {
		return <>{error.data.message}</>;
	}

	return (
		<>
			{error.data.message.map((message, index) => (
				<p key={index}>{message}</p>
			))}
		</>
	);
}