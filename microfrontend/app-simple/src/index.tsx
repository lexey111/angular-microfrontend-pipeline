import React from 'react';

import {CApp} from './app.class';

import {ViewOne} from './views/view-one';
import {ViewTwo} from './views/view-two';

import './index.scss';

void new CApp('one', <ViewOne/>);
void new CApp('two', <ViewTwo/>);
