// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {connectToDatabase} from '../../lib/db'

export default async function handler(req, res) {

  res.status(200).json({ message: 'Welcome to my summer project' })
}
