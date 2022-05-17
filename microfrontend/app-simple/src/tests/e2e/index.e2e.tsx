import React from 'react';
import {createRoot} from "react-dom/client";

import '../../index.scss';
import {ViewOne} from "../../views/view-one";
import {ViewTwo} from "../../views/view-two";

// @ts-ignore
const root = createRoot(document.getElementById('root'));

root.render(<>
	<ViewOne/>
	<hr/>
	<ViewTwo/>
</>);
