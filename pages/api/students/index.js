import axios from 'axios';

const REMOTE = 'https://course.summitglobal.id/students';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const response = await axios.get(REMOTE, {
        headers: { 'Content-Type': 'application/json' },
        validateStatus: () => true,
      });
      if (response.status >= 200 && response.status < 300) {
        return res.status(200).json(response.data.body ? response.data.body.data : response.data);
      } else {
        const errorText = typeof response.data === 'string' ? response.data : JSON.stringify(response.data) || 'Failed to fetch';
        return res.status(response.status).json({ error: errorText });
      }
    }
    if (req.method === 'POST') {
      const response = await axios.post(REMOTE, req.body, {
        headers: { 'Content-Type': 'application/json' },
        validateStatus: () => true,
      });
      const status = response.status >= 200 && response.status < 300 ? 201 : response.status;
      return res.status(status).json(response.data);
    }
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('API proxy error', error);
    res.status(500).json({ error: 'Server proxy error' });
  }
}
