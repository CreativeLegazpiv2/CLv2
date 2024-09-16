import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [checkboxValues, setCheckboxValues] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCheckboxValues((prev) => [...prev, value]);
    } else {
      setCheckboxValues((prev) => prev.filter((val) => val !== value));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formUrl =
      'https://docs.google.com/forms/d/e/1FAIpQLSe9-e9kRYnw9wkFt9SQDfLI8njEQwNV0x1W8IQ8dex5J91yGQ/formResponse';
    const formData = new FormData();

    // Name field (text field)
    formData.append('entry.906311364', name);

    // Checkboxes (send them as separate formData.append calls)
    checkboxValues.forEach((value) => {
      formData.append('entry.1256747576', value); // Use the same entry ID for each checkbox value
    });

    try {
      const response = await fetch(formUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors', // To bypass CORS policy
      });

      if (response) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h1>Submit to Google Form with Checkboxes</h1>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Choose Options:</label>
            <div>
              <input
                type="checkbox"
                value="test1"
                onChange={handleCheckboxChange}
              />
              Test 1
            </div>
            <div>
              <input
                type="checkbox"
                value="test2"
                onChange={handleCheckboxChange}
              />
              Test 2
            </div>
            <div>
              <input
                type="checkbox"
                value="test3"
                onChange={handleCheckboxChange}
              />
              Test 3
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>Thank you for your submission!</p>
      )}
    </div>
  );
}




//https://docs.google.com/forms/d/e/1FAIpQLScSyKe6QAmaAvveOoKVXWaz3uGvdy_UglcU4wAYizFgQa9jhw/viewform?usp=pp_url&entry.1423761216=gg&entry.873872541=Graphic+Design&entry.873872541=Web+Development&entry.873872541=Photography&entry.873872541=Writing&entry.873872541=Music&entry.873872541=Gaming&entry.873872541=Film&entry.873872541=Fine+Arts&entry.873872541=Fashion+Design&entry.873872541=Other&entry.596935029=asffea&entry.1486545489=dfsadfs&entry.905488960=safd@gmail.com&entry.266776651=dsafdfsa&entry.933937910=afsd&entry.2052783211=sdaf&entry.1476922231=dfsa&entry.133240640=dsaf