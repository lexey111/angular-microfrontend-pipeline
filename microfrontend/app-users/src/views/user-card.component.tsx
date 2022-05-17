import React from 'react';

type TUser = {
	user: {
		name: {
			title: string,
			first: string,
			last: string,
		},
		picture: {
			medium: string
		}
	}
}

export const UserCard: React.FC<TUser> = ({user}: TUser) => {
	return <div className={'user-card'}>
		<div className={'avatar'}>
			<img src={user.picture.medium} alt="" loading="lazy"/>
		</div>
		<div className={'description'}>
			{user.name.title} {user.name.last}, {user.name.first}
		</div>
	</div>;
}
