const addDeadEnemy=()=>{
	if(!localStorage.getItem("deadEnnemies"))
		localStorage.setItem("deadEnnemies",1);
	else localStorage.setItem("deadEnnemies",parseInt(localStorage.getItem("deadEnnemies"))+1)
}
export { addDeadEnemy };