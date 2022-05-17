import React from 'react';
import {render, screen} from '@testing-library/react'
import {ViewTwo} from "../views/view-two";

// to suppress console.log in the component's effect
// pretty dirty trick, but there should be no console output, anyway
// @ts-ignore
global.console = {log: jest.fn()}


describe('Testing app-simple, View Two', () => {
	test('Rendering title', () => {
		render(<ViewTwo/>)
		expect(screen.getByText('View Two')).toBeTruthy();
	});

	test('Rendering app id', () => {
		render(<ViewTwo/>)
		expect(screen.getByText('simple-one', {exact: false})).toBeTruthy();
	});
});
