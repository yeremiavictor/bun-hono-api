import { Hono } from 'hono'
import {Routes} from './routes'
const app = new Hono().basePath('/api')

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.route('/posts', Routes)

export default app
