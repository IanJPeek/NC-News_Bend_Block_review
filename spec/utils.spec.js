const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe('formatDates', () => {

  it("returns an array and object when provided with an empty array and object ", () => {
    expect(formatDates([{}])).to.eql([{}])
  })

  it("takes a single object from an array and modifies the format of the 'created_at' timeStamp", () => {
  const intialTimeStamp = [
  {
    body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
    belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
    created_by: 'tickle122',
    votes: -1,
    created_at: 1468087638932,
  }]
 const expected = [
   {
     body:
       "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
     belongs_to:
       "The People Tracking Every Touch, Pass And Tackle in the World Cup",
     created_by: "tickle122",
     votes: -1,
     created_at: new Date(1468087638932)
   }
 ];
 expect(formatDates(intialTimeStamp)).to.eql(expected)
  })

  it("takes several objects from an array and modifies the format of all the 'created_at' timeStamps", () =>{
  const initialTimeStamps = [
  {
    body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
    belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
    created_by: 'tickle122',
    votes: -1,
    created_at: 1468087638932,
  },
  {
    body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
    belongs_to: 'Making sense of Redux',
    created_by: 'grumpy19',
    votes: 7,
    created_at: 1478813209256,
  },
  {
    body: 'Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.',
    belongs_to: '22 Amazing open source React projects',
    created_by: 'grumpy19',
    votes: 3,
    created_at: 1504183900263,
  }];
  const expected = [
    {
      body:
        "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
      belongs_to:
        "The People Tracking Every Touch, Pass And Tackle in the World Cup",
      created_by: "tickle122",
      votes: -1,
      created_at: new Date(1468087638932)
    },
    {
      body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
      belongs_to: "Making sense of Redux",
      created_by: "grumpy19",
      votes: 7,
      created_at: new Date(1478813209256)
    },
    {
      body:
        "Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.",
      belongs_to: "22 Amazing open source React projects",
      created_by: "grumpy19",
      votes: 3,
      created_at: new Date(1504183900263)
    }
  ];
  expect(formatDates(initialTimeStamps)).to.eql(expected);
  })

  xit("does not mutate the initial array", () => {
    const initialTimeStamps = [
  {
    body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
    belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
    created_by: 'tickle122',
    votes: -1,
    created_at: 1468087638932,
  },
  {
    body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
    belongs_to: 'Making sense of Redux',
    created_by: 'grumpy19',
    votes: 7,
    created_at: 1478813209256,
  },
  {
    body: 'Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.',
    belongs_to: '22 Amazing open source React projects',
    created_by: 'grumpy19',
    votes: 3,
    created_at: 1504183900263,
  }];
  expect(formatDates(initialTimeStamps.created_at)).to.equal(initialTimeStamps.created_at)
});
});

describe('makeRefObj', () => {
  it('takes an array with one empty object and returns an empty object', () => {
    expect(makeRefObj([{}])).to.eql({});

  })

 it("takes an array with one object and returns a reference object where the title's property becomes the new key and article_id's property becomes the attached value", () => {
const singleArr = [{ article_id: 1, title: "A" }];
const expected = { A: 1 };
expect(makeRefObj(singleArr)).to.eql(expected)
    
 });

it("takes an array with multiple objects and returns a reference object where all title properties become key and article_id properties their attached values", () => {
  const multiArr = [
    { article_id: 1, title: "A" },
    { article_id: 2, title: "D" },
    { article_id: 3, title: "X" }
  ];
  const expected = { A: 1, D: 2, X:3 };
  expect(makeRefObj(multiArr)).to.eql(expected);
});

});


describe.only('formatComments', () => {
  it('returns an empty object in an array when passed this', () => {
    expect(formatComments([{}])).to.eql([{}]);
  });

  it("returns a single reformatted object in an array when passed this", () => {
    const originalComment = [
  {
    body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
    belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
    created_by: 'tickle122',
    votes: -1,
    created_at: 1468087638932,
  }];
  const refObj = {
    "The People Tracking Every Touch, Pass And Tackle in the World Cup": 18
  };
  const expected = [
  {
    body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
    article_id: 18,
    author: 'tickle122',
    votes: -1,
    created_at: new Date(1468087638932),
  }]

 expect(formatComments(originalComment, refObj)).to.eql(expected);
  });

it("returns multipe reformatted objects in an array when passed these", () => {
  const originalComments = [
    {
      body:
        "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
      belongs_to:
        "The People Tracking Every Touch, Pass And Tackle in the World Cup",
      created_by: "tickle122",
      votes: -1,
      created_at: 1468087638932
    },
    {
      body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
      belongs_to: "Making sense of Redux",
      created_by: "grumpy19",
      votes: 7,
      created_at: 1478813209256
    },
    {
      body:
        "Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.",
      belongs_to: "22 Amazing open source React projects",
      created_by: "grumpy19",
      votes: 3,
      created_at: 1504183900263
    }
  ];
  const refObj = {
    "The People Tracking Every Touch, Pass And Tackle in the World Cup": 18,
    "Making sense of Redux": 4, "22 Amazing open source React projects": 11
  ,};
  const expected = [
    {
      body:
        "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
      article_id: 18,
      author: "tickle122",
      votes: -1,
      created_at: new Date(1468087638932)
    },
    {
      body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
      article_id: 4,
      author: "grumpy19",
      votes: 7,
      created_at: new Date(1478813209256)
    },
    {
      body:
        "Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.",
      article_id: 11,
      author: "grumpy19",
      votes: 3,
      created_at: new Date(1504183900263)
    }
  ];

  expect(formatComments(originalComments, refObj)).to.eql(expected);
});


});
