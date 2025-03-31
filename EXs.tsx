import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

interface Tip {
  title: string;
  description: string;
}

interface ExerciseProps {
  exercise: {
    number: string;
    title: string;
    description: string;
    code: string;
    tips: Tip[];
  };
}

declare global {
  interface Window {
    pyodide: any;
  }
}

const ExerciseCard: React.FC<ExerciseProps> = ({ exercise }) => {
  const [output, setOutput] = useState<string>('');
  const [code, setCode] = useState(exercise.code);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadPyodide = async () => {
      if (!window.pyodide) {
        setIsLoading(true);
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js';
        script.async = true;
        script.onload = async () => {
          // @ts-ignore
          window.pyodide = await loadPyodide();
          setIsLoading(false);
        };
        document.body.appendChild(script);
      }
    };
    loadPyodide();
  }, []);

  const executeCode = async () => {
    if (!window.pyodide) {
      setOutput('Carregando o interpretador Python...');
      return;
    }

    try {
      window.pyodide.runPython(`
        import sys
        import io
        sys.stdout = io.StringIO()
        sys.stderr = io.StringIO()

        def input(prompt_text=""):
          import js
          return js.prompt(prompt_text)
      `);

      window.pyodide.runPython(code);
      const result = window.pyodide.runPython('sys.stdout.getvalue()');
      setOutput(result);
    } catch (error) {
      setOutput(`Erro: ${error}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-2">
          Exercício {exercise.number} - {exercise.title}
        </h2>
        <p className="text-gray-300">{exercise.description}</p>

        <div className="mt-6">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-48 p-4 bg-gray-900 text-green-400 font-mono rounded border border-gray-700 focus:outline-none focus:border-green-500"
            spellCheck="false"
          />
        </div>

        <button
          onClick={executeCode}
          disabled={isLoading}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors"
        >
          <Play className="w-5 h-5" />
          {isLoading ? 'Carregando...' : 'Executar Código'}
        </button>

        <div className="mt-4 p-4 bg-black text-green-400 rounded border border-gray-700 font-mono min-h-[80px]">
          {output || 'A saída do programa aparecerá aqui...'}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">Dicas sobre o código</h3>
        <ul className="space-y-3">
          {exercise.tips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 mt-2 bg-green-500 rounded-full mr-3" />
              <div>
                <strong className="text-gray-800">{tip.title}:</strong>{' '}
                <span className="text-gray-600">{tip.description}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExerciseCard;