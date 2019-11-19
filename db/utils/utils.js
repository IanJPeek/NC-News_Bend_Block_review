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
if (list[0].title === undefined) return {};
//modify so does not mutate...
let copy = list.map(obj => obj);

const refObject = {};
// console.log(copy)
// console.log(copy[0].title)
for (let i = 0; i < copy.length; i++) {
  refObject[copy[i].title] = copy[i].article_id;
}
console.log(refObject)
return refObject;


};

exports.formatComments = (comments, articleRef) => {
  if (comments[0].created_at === undefined) return comments;

let copy = comments.map(obj => obj);

for (let i = 0; i<copy.length; i++){
// rename 'created by' key to 'author'
copy[i].author = copy[i].created_by
delete copy[i].created_by;

// rename 'belongs_to' key to 'article_id'
// assign new property to article_id with lookup Obj
const lookup = (copy[i].belongs_to);
const newProp = articleRef[lookup]
copy[i].article_id = newProp;
delete copy[i].belongs_to;

//reformat date
comments[i].created_at = new Date(comments[i].created_at);
}
console.log (copy)
return copy;


};
