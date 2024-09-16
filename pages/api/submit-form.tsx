// pages/api/submitForm.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const formId = '1FAIpQLScSyKe6QAmaAvveOoKVXWaz3uGvdy_UglcU4wAYizFgQa9jhw'; // Your Google Form ID
    const formUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;

    const formData = new URLSearchParams();
    formData.append('entry.1423761216', req.body.firstName);
    formData.append('entry.873872541', req.body.creativeField.join(','));
    formData.append('entry.596935029', req.body.address);
    formData.append('entry.1486545489', req.body.mobileNumber);
    formData.append('entry.905488960', req.body.email);
    formData.append('entry.266776651', req.body.bio);
    formData.append('entry.933937910', req.body.instagram);
    formData.append('entry.2052783211', req.body.facebook);
    formData.append('entry.1476922231', req.body.twitter);
    formData.append('entry.133240640', req.body.portfoliolink);

    try {
      const response = await fetch(formUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error submitting form', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
