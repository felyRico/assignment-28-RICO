import axios from 'axios';

const REMOTE = 'https://course.summitglobal.id/students';

export default async function handler(req, res) {
  try {
    if (req.method === 'PUT') {
      const id = req.query.id || '';
      const response = await axios.put(`${REMOTE}?id=${encodeURIComponent(id)}`, req.body, {
        headers: { 'Content-Type': 'application/json' },
        validateStatus: () => true,
      });
      const status = response.status >= 200 && response.status < 300 ? 200 : response.status;
      return res.status(status).json(response.data);
    }
    if (req.method === 'DELETE') {
      const id = req.query.id || '';
      const response = await axios.delete(`${REMOTE}?id=${encodeURIComponent(id)}`, {
        headers: { 'Content-Type': 'application/json' },
        validateStatus: () => true,
      });
      const status = response.status >= 200 && response.status < 300 ? 200 : response.status;
      return res.status(status).json(response.data);
    }
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('API proxy error', error);
    res.status(500).json({ error: 'Server proxy error' });
  }
}
