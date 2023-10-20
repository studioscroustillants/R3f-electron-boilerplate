const buildings = [
	{name:"Simple house",price:10000,model:"simple_house_1",size:{x:16,y:16},type:"development",rotation:[0,0,0],scale:[0.18,0.18,3]},
	{name:"Farm",price:15000,model:"farm_house",size:{x:32,y:32},type:"ressources"},
	{name:"Mine",price:10000,model:"mine",size:{x:16,y:16},type:"ressources"},
	{name:"Lumber mill",price:12000,model:"lumber_mill",size:{x:32,y:32},type:"ressources"},
	{name:"Market",price:9000,model:"market",size:{x:64,y:64},type:"ressources"},
	{name:"Public speaker",price:9000,model:"auditorium",size:{x:16,y:16},type:"knowledge"},
	{name:"School",price:12000,model:"school",size:{x:64,y:32},type:"knowledge"},
	{name:"University",price:25000,model:"university",size:{x:64,y:64},type:"knowledge"},
	{name:"Casern",price:15000,model:"casern_small",size:{x:64,y:64},type:"military",rotation:[Math.PI,0,0],scale:[24,4,9]},
	{name:"Elite training ground",price:30000,model:"elite_training_ground",size:{x:64,y:64},type:"military"}
	];

export default buildings;