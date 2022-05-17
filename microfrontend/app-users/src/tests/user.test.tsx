import React from 'react';
import {render, screen} from '@testing-library/react'
import {UserCard} from "../views/user-card.component";

const user = {
	name: {
		title: 'Mr',
		first: 'John',
		last: 'Doe',
	},
	picture: {
		medium: 'some_url'
	}
}

describe('Testing app-users, User component', () => {
	test('Rendering User Name', () => {
		render(<UserCard user={user}/>)
		expect(screen.getByText('Mr Doe, John', {exact: false})).toBeTruthy();
	});

	test('Rendering Avatar', () => {
		render(<UserCard user={user}/>)
		const displayedImage = document.querySelector("img") as HTMLImageElement;
		expect(displayedImage.src).toContain("some_url");
	});
});
