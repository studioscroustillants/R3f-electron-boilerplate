const chosenRandomNumber = 1;

const contains = (name) => {
	if(localStorage.getItem("badges"))
	{
		let hasRequirements=true;
		let badges = JSON.parse(localStorage.getItem("badges"));
		for(let cur of name)
			hasRequirements = hasRequirements && badges.filter(it=>it.name==cur).length>0;
		return hasRequirements;
	}
	return false;
}

const addBadge = (type,utensil=undefined)=>{
	if(localStorage.getItem("badges"))
	{
		let badges = JSON.parse(localStorage.getItem("badges"));
		let tempBadg = [];
		let badgesToAdd = tempBadg.filter(bad=>bad.type==type).filter(bad=>bad.utensil==utensil);
		for(let cur of badgesToAdd)
			if(Math.floor(Math.random()*cur.chances)==chosenRandomNumber)
				if(!contains([cur.name]))
				{
					badges.push(cur);
					localStorage.setItem("badges",JSON.stringify(badges));
				}
	}
}

export {addBadge,contains}