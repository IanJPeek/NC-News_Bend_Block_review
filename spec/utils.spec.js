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

describe.only('makeRefObj', () => {
  it('takes an array with one empty object and returns an empty array & object', () => {
    expect(makeRefObj([{}])).to.eql([{}]);

    
    
  });
});

/*
This utility function should be able to take an array (`list`) of objects and return a reference object. The reference object must be keyed by each item's title, with the values being each item's corresponding id. e.g.

`[{ article_id: 1, title: 'A' }]`

will become

`{ A: 1 }`
*/

describe('formatComments', () => {});
