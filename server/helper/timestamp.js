const timeStamp = () => {
	var today =new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
	var DateTime = date+' '+time;
	return DateTime;
}

export default timeStamp;