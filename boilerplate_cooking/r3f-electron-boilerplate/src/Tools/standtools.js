const addItem = (curItem,quantity=1) =>{
	if(localStorage.getItem("stand"))
	{
		let inventory = JSON.parse(localStorage.getItem("stand"));
		const tempInvFilter = inventory.filter(it=>it.name==curItem.name);
		
		if(tempInvFilter.length<1)
		{	
			inventory.push(curItem);
			inventory[inventory.length-1].quantity=1;
		}
		else inventory[inventory.indexOf(tempInvFilter[0])].quantity+=quantity;
		
		for(let i=1;i<tempInvFilter.length;i++)
			inventory.splice(inventory.indexOf(tempInvFilter[i]),1);

		localStorage.setItem("stand",JSON.stringify(inventory));
		
		return true;
	}
	return false;
}

const removeItem = (curItem,quantity=1) =>{
	if(localStorage.getItem("stand"))
	{
		let inventory = JSON.parse(localStorage.getItem("stand"));
		const tempInvFilter = inventory.filter(it=>it.name==curItem.name);
		
		// console.log("currentItem name : ",curItem.name);
		// console.log("items to remove found : ",tempInvFilter.length);
		
		if(tempInvFilter.length>0)
		{
			inventory[inventory.indexOf(tempInvFilter[0])].quantity-=quantity;
			if(inventory[inventory.indexOf(tempInvFilter[0])].quantity<1)
				for(let i=0;i<tempInvFilter.length;i++)
					inventory.splice(inventory.indexOf(tempInvFilter[i]),1);
		}
		else return false;

		localStorage.setItem("stand",JSON.stringify(inventory));
		
		return true;
	}
	return false;
}

export {addItem, removeItem};