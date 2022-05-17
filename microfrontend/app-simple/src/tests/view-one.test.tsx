import React from 'react';
import {render, screen} from '@testing-library/react'
import {ViewOne} from "../views/view-one";

// to suppress console.log in the component's effect
// pretty dirty trick, but there should be no console output, anyway
// @ts-ignore
global.console = {log: jest.fn()}


describe('Testing app-simple, View One', () => {
	test('Rendering title', () => {
		render(<ViewOne/>)
		expect(screen.getByText('View One')).toBeTruthy();
	});

	test('Rendering app id', () => {
		render(<ViewOne/>)
		expect(screen.getByText('simple-one', {exact: false})).toBeTruthy();
	});
});
