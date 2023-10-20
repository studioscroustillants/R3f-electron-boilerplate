const add = (amount)=>{
	if(localStorage.getItem("wallet"))
		localStorage.setItem("wallet",parseFloat(localStorage.getItem("wallet"))+parseFloat(amount));
}

export {add};