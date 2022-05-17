import React from 'react';
import {render, screen} from '@testing-library/react'
import {ViewText} from "../views/view-text";

// to suppress console.log in the component's effect
// pretty dirty trick, but there should be no console output, anyway
// @ts-ignore
global.console = {log: jest.fn()}


describe('Testing app-second, View Text', () => {
	test('Rendering title', () => {
		render(<ViewText/>)
		expect(screen.getByText('Wise words')).toBeTruthy();
	});

	test('Rendering text', () => {
		render(<ViewText/>)
		expect(screen.getByText('Lorem ipsum dolor sit amet', {exact: false})).toBeTruthy();
	});
});
