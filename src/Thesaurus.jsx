import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import {useState, useEffect} from 'react';

const Thesaurus = () => {
 const [input, setInput] = useState("");
 const [words, setWords] = useState("");
    //useEffect(() => fetchThesaurus(input), [input])
   
    
    const handleChange = (event) => {
        setInput(event.target.value);
        
    }
    
    const fetchThesaurus = async (word) => {
        console.log(input)
    const response = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`);
    const data = await response.json();
    return data;
  };

  const { data, isLoading, isError } = useQuery('thesaurus', () =>
    fetchThesaurus(input)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <h1>Thesaurus</h1>
      <div>
        <input 
            type="text" 
            placeholder="enter a word" 
            value={input}
            onChange={() => handleChange(event)}
            />
        <button
            onClick={() => fetchThesaurus(input)}
        >Get Word</button>
      </div>
      <ul>
        {data.map((item) => (
          <li key={item.word}>{item.word}</li>
        ))}
      </ul>
    </div>
  );
};

export default Thesaurus;