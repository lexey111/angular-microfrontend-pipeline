import React from 'react';
import {createRoot} from "react-dom/client";

import '../../index.scss';
import {ViewUsers} from "../../views/view-users";

// @ts-ignore
const root = createRoot(document.getElementById('root'));

root.render(<>
	<ViewUsers/>
</>);
