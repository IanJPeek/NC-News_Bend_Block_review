exports.formatDates = list => {
  
  if (list[0].created_at === undefined ) return list
  
  //modify so does not mutate...
  let copy = list.map(obj => obj)
  
  for (let i = 0; i<copy.length; i++){
  copy[i].created_at = new Date(copy[i].created_at); 
  }

  return copy
  

  //  const formattedTimestamps = list.map(obj => obj.created_at = new Date(obj.created_at))
  // console.log(formattedTimestamps)
  
  // return formattedTimestamps

 /* console.log(list)
  const dateToChange = list[0].created_at
  const updatedFormat = new Date(dateToChange)
  list[0].created_at = new Date(updatedFormat)
  return(list);
*/




};

exports.makeRefObj = list => {
if (list[0].title === undefined) return list;

//modify so does not mutate...
let copy = list.map(obj => obj);


};

exports.formatComments = (comments, articleRef) => {};
