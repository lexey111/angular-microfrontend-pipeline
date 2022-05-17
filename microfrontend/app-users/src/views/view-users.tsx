import React, {useEffect, useRef, useState} from 'react';
import {UserCard} from "./user-card.component";

declare const APPID: string; // esbuild DEFINE = name of application folder

export const ViewUsers: React.FC = () => {
	const destroying = useRef(false);
	const [users, setUsers] = useState<Array<any>>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		console.log('Mounting: ViewUsers [' + APPID + '/text]');
		return () => {
			destroying.current = true;
			console.log('Unmounting: ViewUsers [' + APPID + '/text]');
		};
	}, []);

	useEffect(() => {
		setLoading(true);
		setUsers([]);

		fetch('https://randomuser.me/api/?results=100')
			.then(res => res.json())
			.then(data => {
				console.log(data);

				setTimeout(() => {
					if (!destroying.current && data.results) {
						setUsers(data.results);
						setLoading(false);
					}
				}, 1000);
			});
	}, []);

	// c-inline-spinner - from the host app stylesheet
	return <div className='_m_view_users'>
		{loading && <p><i className="c-inline-spinner"></i>  Fetching the data, please wait...</p>}
		{users.length > 0 && <div className={'user-list'}>
			{users.map(user => {
				return <UserCard key={user.login.uuid} user={user}/>;
			})}
		</div>
		}
	</div>;
}
