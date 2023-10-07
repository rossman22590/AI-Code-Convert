import { CodeBlock } from '@/components/CodeBlock';
import { LanguageSelect,languages } from '@/components/LanguageSelect';
import { NaturalLanguageSelect,naturalLanguages } from '@/components/NaturalLanguageSelect';
import { TextBlock } from '@/components/TextBlock';
import { TranslateBody } from '@/types/types';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [option, setOption] = useState('');
  const [title, setTitle] = useState('Code Converter(Generator | Translator)');
  const [subtitle, setSubtitle] = useState('Code Converter AI | Convert Code or Natural Language To Programming Language Code');
  const [inputLanguage, setInputLanguage] = useState<string>('Natural Language');
  const [outputLanguage, setOutputLanguage] = useState<string>('-- Select --');
  const [outputNaturalLanguage, setOutputNaturalLanguage] = useState<string>('English');
  const [inputCode, setInputCode] = useState<string>('');
  const [outputCode, setOutputCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [userConvert, setUserConvert] = useState<boolean>(false);
  const [userAsk, setUserAsk] = useState<boolean>(false);
  const [userOptimize, setUserOptimize] = useState<boolean>(false);
  const [userExplain, setUserExplain] = useState<boolean>(false);
  const [hasTranslated, setHasTranslated] = useState<boolean>(false);

  const resetOtherOption = () => {
	  setUserConvert(false);
	  setUserAsk(false);
	  setUserOptimize(false);
	  setUserExplain(false);
  };

  const handleTranslate = async (userAsk: boolean, option: string) => {
	// window.scrollTo(0, 180);
    const maxCodeLength = 30000;
	
	if(outputLanguage === '-- Select --') {
	   alert('Please select program languages.');
	   return;
	}

    if (inputLanguage === outputLanguage) {
      alert('Please select different languages.');
      return;
    }

    if (!inputCode) {
      alert('Please enter some code.');
      return;
    }

    if (inputCode.length > maxCodeLength) {
      alert(
        `Please enter code less than ${maxCodeLength} characters. You are currently at ${inputCode.length} characters.`,
      );
      return;
    }

    setLoading(true);
    setOutputCode('');

    const controller = new AbortController();
    const body: TranslateBody = {
      inputLanguage,
      outputLanguage,
      inputCode,
	  option,
	  outputNaturalLanguage
    };

    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      setLoading(false);
      alert('Please try again later.');
      return;
    }

    const data = response.body;

    if (!data) {
      setLoading(false);
      alert('Something went wrong.');
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let code = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      code += chunkValue;

      setOutputCode((prevCode) => prevCode + chunkValue);
    }

    setLoading(false);
    setHasTranslated(true);
    copyToClipboard(code);
	resetOtherOption();
  };

  const copyToClipboard = (text: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  useEffect(() => {
	  
  }, [outputLanguage]);

  return (
    <>
      <Head>
        <title>AI Code Converter | AI Code Translator | AI Code Generator</title>
        <meta name="description" content="Use AI To Convert Code Or Generate Code From One Language To Another. AI Code Translator. Translate Code From Any Language To Another With A Click Of A Button."/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="keywords" content="AI Code Converter,Code Convert AI, Code Generate AI,Code Translator,AICodeHelper,free,online" />
		<link rel="canonical" href="https://aicodeconvert.com" />
        <link rel="icon" href="/code.png" />
      </Head>
	  <div className="h-100 flex justify-between items-center pl-2 pr-2 md:pl-10 md:pr-10 pt-2 bg-[#0E1117]">
	      <div className="flex items-center">
	          <svg width="40" height="40" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
	              <path fill="#3b82f6" d="M516 673c0 4.4 3.4 8 7.5 8h185c4.1 0 7.5-3.6 7.5-8v-48c0-4.4-3.4-8-7.5-8h-185c-4.1 0-7.5 3.6-7.5 8v48zm-194.9 6.1l192-161c3.8-3.2 3.8-9.1 0-12.3l-192-160.9A7.95 7.95 0 0 0 308 351v62.7c0 2.4 1 4.6 2.9 6.1L420.7 512l-109.8 92.2a8.1 8.1 0 0 0-2.9 6.1V673c0 6.8 7.9 10.5 13.1 6.1zM880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"/>
	          </svg>
	          <h1 className="text-white font-bold text-2xl ml-1">
	              <a href="https://aicodeconvert.com">AI Tutor Code</a>
	          </h1>
	      </div>
	      <div className="flex items-center hidden md:block lg:block">
			  <a href="https://account.myapps.ai/settings/profile" className="text-blue-500 text font-semibold mr-1 md:mr-4 lg:mr-4">My Account</a>
	          <a href="https://account.myapps.ai/premium" className="text-white text font-semibold mr-1 md:mr-4 lg:mr-4">Premium Apps</a>
	          <a href="https://account.myapps.ai/dashboard" className="text-white text font-semibold mr-1 md:mr-4 lg:mr-4">Dashboard</a>
	      </div>
	  </div>
	  <div className="flex flex-col items-center justify-center bg-[#0E1117] text-white">
	    <h2 className="text-3xl md:text-4xl font-bold"><span className="text-blue-500">AI</span> {title}</h2>
	    <h3 className="mt-2 md:mt-5 text-xl text-center leading-2">{subtitle}</h3>
	  </div>
      <div className="flex h-full flex-col items-center bg-[#0E1117] px-4 pb-8 text-neutral-200 sm:px-10">
        <div className="mt-6 flex w-full max-w-[1600px] flex-col justify-between sm:flex-row sm:space-x-2">
          <div className="h-100 flex flex-col justify-center space-y-2 sm:w-2/4">
            <div className="text-center text-xl font-bold">From</div>

            <LanguageSelect
              language={inputLanguage}
              onChange={(value) => {
                setInputLanguage(value);
                setHasTranslated(false);
                // setInputCode('');
                // setOutputCode('');
              }}
            />

            {inputLanguage === 'Natural Language' ? (
              <TextBlock
                text={inputCode}
                editable={!loading}
                onChange={(value) => {
                  setInputCode(value);
                  setHasTranslated(false);
                }}
              />
            ) : (
              <CodeBlock
                code={inputCode}
                editable={!loading}
                onChange={(value) => {
                  setInputCode(value);
                  setHasTranslated(false);
                }}
              />
            )}
          </div>
          <div className="mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">
            <div className="text-center text-xl font-bold">TO</div>

            <div className="flex space-x-2">
			  <div className="flex-1">
			    <LanguageSelect
			      language={outputLanguage}
			      onChange={(value) => {
			        setOutputLanguage(value);
			        setOutputCode('');
			      }}
			    />
			  </div>
			  <div>
			    <NaturalLanguageSelect
			      language={outputNaturalLanguage}
			      onChange={(value) => {
			        setOutputNaturalLanguage(value);
			      }}
			    />
			  </div>
			</div>

            {outputLanguage === 'Natural Language' ? (
              <TextBlock text={outputCode} />
            ) : (
              <CodeBlock code={outputCode} />
            )}
          </div>
        </div>
		<div className="mt-8 flex items-center space-x-2 flex-wrap justify-center">
		  <button
		    className="w-[110px] cursor-pointer rounded-full bg-[#4c81ec] px-4 py-2 font-bold hover:bg-blue-600 active:bg-blue-700"
		    onClick={() => {
				setOption('convert');
				setUserConvert(true);
				handleTranslate(false, 'convert');
			}}
		    disabled={loading}
		  >
		    {loading && userConvert ? 'Loading' : 'Generate'}
		  </button>
		  <button
		    className="w-[110px] cursor-pointer rounded-full bg-[#6269e7] hover:bg-blue-600 px-4 py-2 font-bold"
		    onClick={() => {
				setOption('ask');
				setUserAsk(true);
				handleTranslate(true, 'ask');
			}}
		    disabled={loading}
		  >
		    {loading && userAsk ? 'Loading' : 'Ask'}
		  </button>
		  <button
		    className="w-[110px] cursor-pointer rounded-full bg-[#8262ec] hover:bg-[#9b5eed] to-red-400 px-4 py-2 font-bold"
		    onClick={() => {
				setOption('optimize');
				setUserOptimize(true);
				handleTranslate(true, 'optimize');
			}}
		    disabled={loading}
		  >
		    {loading && userOptimize ? 'Loading' : 'Optimize'}
		  </button>
		  <button
		    className="w-[110px] cursor-pointer rounded-full bg-[#9b5eed] hover:bg-[#c856e5] px-4 py-2 font-bold"
		    onClick={() => {
				setOption('explain');
				setUserExplain(true);
				handleTranslate(true, 'explain');
			}}
		    disabled={loading}
		  >
		    {loading && userExplain ? 'Loading' : 'Explain'}
		  </button>
		 
		</div>
	  </div>
	  <div className="pl-6 pr-6 mt-1 md:pl-20 md:pr-20 bg-[#0E1117]">
		<div id="about" className="text-white">
		  <div className="text-2xl">About Us</div>
		  <ul className="mt-4 list-disc list-inside">
		    <li className="mb-2">AICodeConvert(AI Code Converter | Code Converter AI) simplifies coding with AI by integrating AI Code Translator and AI Code Generator. </li>
		    <li className="mb-2">It efficiently translates existing code into different programming languages (AI Code Translator) and automatically generates high-quality code snippets and templates (AI Code Generator). </li>
			<li className="mb-2">This powerful combination makes AICodeConvert an indispensable tool for developers, 
					providing a convenient and intelligent coding experience.</li>
		    <li className="mb-2">All for free(AI Code Convert | AI Code Converter).</li>
			<li className="mb-2">Your Best AI Code Helper.</li>
		  </ul>
		</div>


	  </div>
	  <div className="bg-[#0E1117] text-center text-white text-sm pt-10">
	  	AI Tutor Copyright © <span className="text-blue-500">https://myapps.ai</span>
	  </div>

    </>
  );
}
