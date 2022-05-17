import React, {useEffect} from 'react';

declare const APPID: string; // esbuild DEFINE = name of application folder

export const ViewOne: React.FC = () => {
	useEffect(() => {
		console.log('Mounting: ViewOne [' + APPID + '/one]');
		return () => {
			console.log('Unmounting: ViewOne [' + APPID + '/one]');
		};
	}, []);

	return <div className='_m_view_one'>
		<h2 id={'title_1'}>View One</h2>
		<p>This is view "one" from micro-frontend application "{APPID}".</p>
	</div>;
}
