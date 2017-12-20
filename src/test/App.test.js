/* 
  This test file includes several basic tests to learn jest.
*/
import { fromJS } from 'immutable'
const fetchData = jest.fn()
const arrayA = fromJS([1,2])
let arrayB = arrayA.push(3)

test('', () => {
  expect(arrayA).not.toContain(3)
  expect(arrayB).toContain(3)  
})
/*
  asynchronous test
*/

// this callback is asynchronous pattern, and will not be detected since jest will finish once it reach the end.
test('the data is 122', () => {
  function callback(data) {
    setTimeout(function(){
      expect(data).toBe('122')
    },1000)
  }
  
  fetchData(callback('122'))
})

// This coding type of mock setTimeout will leads to test time out, just skip
test.skip('the data is 122', done => {
  function callback(data) {
    setTimeout(function(){
      expect(data).toBe('122')
      done()
    },1000)
  }
  
  fetchData(callback('1222'))
})

// one choice for asynchronous
test('mock setTimeout test', async () => {
  let data = 0
  await new Promise(resolve => {
    setTimeout(() => {
      data = 2
      resolve()
    }, 1000)
  })

  expect(data).toBe(2)
})

/*
  setup 
  beforeEach
  afterEach
*/
// const isCity = {
//   'Vienna': false,
//   'San Juan': false
// }
// function initializeCityDatabase () {
//   isCity['Vienna'] = !isCity['Vienna']
//   isCity['San Juan'] = !isCity['San Juan']
// }

// function clearCityDatabase () {
//   isCity['Vienna'] = false
//   isCity['San Juan'] = false
// }

// beforeEach(() => {
//   initializeCityDatabase()
// })

// afterEach(() => {
//   clearCityDatabase()
// })

// test('city database has Vienna', () => {
//   expect(isCity['Vienna']).toBeTruthy()
// })

// test('city database has San Juan', () => {
//   expect(isCity['San Juan']).toBeTruthy()
// })

/*
  teardown
*/
const isCity = {
  'Vienna': false,
  'San Juan': true
}
function initializeCityDatabase () {
  return new Promise(resolve => {
    setTimeout(() => {
      isCity['Vienna'] = true
      resolve()
    }, 1000)
  })
}

function clearCityDatabase () {
  return new Promise(resolve => {
    setTimeout(() => {
      isCity['Vienna'] = false
      isCity['San Juan'] = false
      resolve()
    }, 1000)
  })
}

beforeAll(() => {
  return initializeCityDatabase()
})

afterAll(() => {
  return clearCityDatabase()
})

/* 
  run the following would lead error
*/
// beforeEach(() => {
//   return initializeCityDatabase()
// })

// afterEach(() => {
//   return clearCityDatabase()
// })

test('city database has Vienna', () => {
  expect(isCity['Vienna']).toBeTruthy()
})

test('city database has San Juan', () => {
  expect(isCity['San Juan']).toBeTruthy()
})

//describe('Scoped / Nested block', () => {
//   beforeAll(() => console.log('2 - beforeAll'))
//   afterAll(() => console.log('2 - afterAll'))
//   beforeEach(() => console.log('2 - beforeEach'))
//   afterEach(() => console.log('2 - afterEach'))
//   test('', () => console.log('2 - test'))
// })

// add only would skip all the others on the page
// test.only('this will be the only test that runs', () => {
//   expect(true).toBe(true)
// })
