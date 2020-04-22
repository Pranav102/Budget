class trees{
	constructor(nameOfPark,noOfTrees,area,Age){
		this.nameOfPark=nameOfPark;
		this.noOfTrees=noOfTrees;
		this.area=area;
		this.Age=Age;
	}
	Treedensity (){
		const density=this.noOfTrees/this.area;
		console.log('${this.nameOfPark} has a density of ${density}');
	}

}	
const trees1= new trees('pranavPark','1200','200','500');
const trees2= new trees('rishiPark','1200','200','500');
const trees3= new trees('parasPark','1200','200','500');

