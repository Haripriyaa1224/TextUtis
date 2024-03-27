import React, { useReducer, useRef } from 'react';
import './TextEditor.css';

const textReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TEXT':
      return {
        ...state,
        text: action.payload,
      };
    case 'TO_UPPERCASE':
      return {
        ...state,
        text: state.text.toUpperCase(),
      };
    case 'TO_LOWERCASE':
      return {
        ...state,
        text: state.text.toLowerCase(),
      };
    case 'CLEAR_TEXT':
      return {
        ...state,
        text: '',
      };
    case 'REMOVE_EXTRA_SPACES':
      return {
        ...state,
        text: state.text.replace(/\s+/g, ' ').trim(),
      };
    default:
      return state;
  }
};

const TextEditor = () => {
  const [state, dispatch] = useReducer(textReducer, { text: '' });
  const textAreaRef = useRef(null);

  const handleInputChange = (event) => {
    dispatch({ type: 'SET_TEXT', payload: event.target.value });
  };

  const convertToUppercase = () => {
    dispatch({ type: 'TO_UPPERCASE' });
  };

  const convertToLowercase = () => {
    dispatch({ type: 'TO_LOWERCASE' });
  };

  const clearText = () => {
    dispatch({ type: 'CLEAR_TEXT' });
  };

  const removeExtraSpaces = () => {
    dispatch({ type: 'REMOVE_EXTRA_SPACES' });
  };

  const selectTextArea = () => {
    textAreaRef.current.select();
  };

  const copyToClipboard = () => {
    textAreaRef.current.select();
    document.execCommand('copy');
  };

  // Function to calculate reading time based on average reading speed
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200; // Average reading speed
    const words = text.split(/\s+/).filter(Boolean).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime;
  };
  return (
    <div className='container'>
      <h1>TextUtils - Word Counter, Character Counter, Remove Extra Space</h1>
      <textarea
        ref={textAreaRef}
        className='text-area'
        value={state.text}
        onChange={handleInputChange}
        placeholder="Enter text..."
        rows={10}
        cols={50}
      />
      <div>
        <button onClick={convertToUppercase}>Uppercase</button>
        <button onClick={convertToLowercase}>Lowercase</button>
        <button onClick={clearText}>Clear Text</button>
        <button onClick={removeExtraSpaces}>Remove Extra Spaces</button>
        <button onClick={selectTextArea}>Select Text</button>
        <button onClick={copyToClipboard}>Copy to Clipboard</button>
      </div>
      <div>
        <h1>Summary Of Your Text</h1>
        <p>Number of words: {state.text.split(/\s+/).filter(Boolean).length}</p>
        <p>Number of Characters: {state.text.length}</p>
        {/* You might want to calculate the reading time based on average reading speed */}
        <p>Reading Time: {calculateReadingTime(state.text)} minute(s)</p>
      </div>
      <div>
        <h3>Preview</h3>
        <div className='preview-box'>{state.text}</div>
      </div>
    </div>
  );
};

export default TextEditor;
