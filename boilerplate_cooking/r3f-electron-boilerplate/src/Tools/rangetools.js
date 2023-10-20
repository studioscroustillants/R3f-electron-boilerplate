const rangeBetween = (a,b,rang) => {
	return (a<(b+rang)) && (a>(b-rang));
}

export { rangeBetween }