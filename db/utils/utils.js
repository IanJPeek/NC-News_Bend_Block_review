exports.formatDates = list => {
  if (list[0].created_at === undefined) return list;

  let copy = list.map(obj => {
    return { ...obj };
  });

  for (let i = 0; i < copy.length; i++) {
    copy[i].created_at = new Date(copy[i].created_at);
  }

  return copy;
};

exports.makeRefObj = list => {
  let copy = list.map(obj => obj);

  const refObject = {};
  for (let i = 0; i < copy.length; i++) {
    refObject[copy[i].title] = copy[i].article_id;
  }

  return refObject;
};

exports.formatComments = (comments, articleRef) => {
  if (comments[0].created_at === undefined) return comments;

  let copy = comments.map(obj => {
    return { ...obj };
  });

  for (let i = 0; i < copy.length; i++) {
    copy[i].author = copy[i].created_by;
    delete copy[i].created_by;

    const lookup = copy[i].belongs_to;
    const newProp = articleRef[lookup];
    copy[i].article_id = newProp;
    delete copy[i].belongs_to;

    copy[i].created_at = new Date(comments[i].created_at);
  }

  return copy;
};
