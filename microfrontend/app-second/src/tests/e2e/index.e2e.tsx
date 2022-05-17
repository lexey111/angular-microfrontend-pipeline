import React from 'react';
import {createRoot} from "react-dom/client";

import '../../index.scss';
import {ViewText} from "../../views/view-text";

// @ts-ignore
const root = createRoot(document.getElementById('root'));

root.render(<>
	<ViewText/>
</>);
