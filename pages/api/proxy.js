// pages/api/proxy.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScSyKe6QAmaAvveOoKVXWaz3uGvdy_UglcU4wAYizFgQa9jhw/formResponse';
      const formData = new URLSearchParams();
  
      // Populate formData with your form fields
      for (const [key, value] of Object.entries(req.body)) {
        formData.append(key, value);
      }
  
      try {
        const response = await fetch(formUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        });
  
        if (response.ok) {
          res.status(200).json({ message: 'Form submitted successfully!' });
        } else {
          res.status(response.status).json({ message: 'Failed to submit form' });
        }
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      // Method Not Allowed
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  