const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')

const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')

beforeEach(async () => {
    await Note.deleteMany({})
  
    let noteObject = new Note(helper.initialNotes[0])  
    await noteObject.save()
  
    noteObject = new Note(helper.initialNotes[1])  
    await noteObject.save()
})

test('a valid note can be added', async () => {
    const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
    }
  
    await api
        .post('/api/notes')
        .send(newNote)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/notes')
  
    const contents = response.body.map(r => r.content)
  
    expect(response.body).toHaveLength(helper.initialNotes.length + 1)
    expect(contents).toContain(
        'async/await simplifies making async calls'
    )
})

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
    const response = await api.get('/api/notes')
  
    expect(response.body).toHaveLength(2)
})
  
test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/notes')
  
    expect(response.body[0].content).toBe('HTML is easy')
})
  
afterAll(() => {
    mongoose.connection.close()
})