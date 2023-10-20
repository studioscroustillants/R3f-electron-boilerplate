const removeItem = (curItem) =>{
	if(localStorage.getItem("inventory"))
	{
		let inventory = JSON.parse(localStorage.getItem("inventory"));
		let pointCurItem = inventory.filter(it=>it.name==curItem.name);
		
		if(--inventory[inventory.indexOf(pointCurItem[0])].quantity==0)
			inventory.splice(inventory.indexOf(pointCurItem[0]),1);

		localStorage.setItem("inventory",JSON.stringify(inventory));
		return true;
	}
	return false;
}

const addItem = (curItem,quantity=1) =>{
	if(localStorage.getItem("inventory"))
	{
		let inventory = JSON.parse(localStorage.getItem("inventory"));
		const tempInvFilter = inventory.filter(it=>it.name==curItem.name);
		
		if(tempInvFilter.length<1)
		{	
			inventory.push(curItem);
			inventory[inventory.length-1].quantity+=(--quantity);
		}
		else inventory[inventory.indexOf(tempInvFilter[0])].quantity+=quantity;
		
		for(let i=1;i<tempInvFilter.length;i++)
			inventory.splice(inventory.indexOf(tempInvFilter[i]),1);

		localStorage.setItem("inventory",JSON.stringify(inventory));
		
		return true;
	}
	return false;
}

const addManyItems = (curItem) =>{
	let isOk = true;
	for(let cur of curItem)
		isOk = isOk && addItem(cur,cur.quantity);
	return isOk;
}

const removeSeveral = (item,quantity=1)=>{
	if(localStorage.getItem("inventory"))
	{
		let inventory = JSON.parse(localStorage.getItem("inventory"));
		let pointCurItem = inventory.filter(it=>it.name==item.name);
		
		if((inventory[inventory.indexOf(pointCurItem[0])].quantity-=quantity)==0)
			inventory.splice(inventory.indexOf(pointCurItem[0]),1);

		localStorage.setItem("inventory",JSON.stringify(inventory));
		return true;
	}
	return false;
}

const contains = (name) => {
	if(localStorage.getItem("inventory"))
	{
		let hasRequirements=true;
		let inventory = JSON.parse(localStorage.getItem("inventory"));
		for(let cur of name)
			hasRequirements = hasRequirements && inventory.filter(it=>it.name==cur).length>0;
		return hasRequirements;
	}
	return false;
}

const checkQuantity = (name,quantity=1) => {
	return localStorage.getItem("inventory")&&(JSON.parse(localStorage.getItem("inventory")).filter(it=>it.name==name)[0].quantity>quantity);
}

export {removeSeveral,removeItem,addItem,addManyItems,contains,checkQuantity};