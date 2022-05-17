import React, {useEffect} from 'react';

declare const APPID: string; // esbuild DEFINE = name of application folder

export const ViewTwo: React.FC = () => {
	useEffect(() => {
		console.log('Mounting: ViewTwo [' + APPID + '/two]');
		return () => {
			console.log('Unmounting: ViewTwo [' + APPID + '/two]');
		};
	}, []);

	return <div className='_m_view_two'>
		<h2 id={'title_2'}>View Two</h2>
		<p>This is view "two" from micro-frontend application "{APPID}".</p>
	</div>;
}
