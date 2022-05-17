module.exports = (targetOptions, indexHTML) => {
	const isDevelopment = targetOptions.target === 'development' || targetOptions.target === 'serve';

	const insertion = `
  <script crossorigin src="https://unpkg.com/react@18/umd/react.${isDevelopment ? 'development' : 'production.min'}.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.${isDevelopment ? 'development' : 'production.min'}.js"></script>
  <script src="assets/loader.js"></script>
`;
	const idx = indexHTML.indexOf('</head>');
	console.log(`index.html (${isDevelopment ? 'dev' : 'prod'}) processed.`);
	return `${indexHTML.slice(0, idx)}
${insertion}
${indexHTML.slice(idx)}	
	`;
};
