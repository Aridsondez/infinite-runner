import { useState, useEffect } from 'react';
import { Play, Pause, Flag, VolumeX, Volume2 } from 'lucide-react';

const UI = ({ startGame, pauseGame, isPaused, isGameStarted }) => {
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [muted, setMuted] = useState(false);
  const [currentWord, setCurrentWord] = useState({
    spanish: '¡Hola!',
    english: 'Hello!'
  });

  const spanishWords = [
    { spanish: '¡Hola!', english: 'Hello!' },
    { spanish: 'Adelante', english: 'Forward' },
    { spanish: 'Izquierda', english: 'Left' },
    { spanish: 'Derecha', english: 'Right' },
    { spanish: 'Saltar', english: 'Jump' },
    { spanish: 'Correr', english: 'Run' },
    { spanish: '¡Vamos!', english: "Let's go!" }
  ];

  const handleStartGame = () => {
    setShowStartScreen(false);
    startGame();
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const togglePause = () => {
    pauseGame();
  };

  useEffect(() => {
    if (isGameStarted && !isPaused) {
      const wordInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * spanishWords.length);
        setCurrentWord(spanishWords[randomIndex]);
      }, 5000);

      return () => clearInterval(wordInterval);
    }
  }, [isGameStarted, isPaused]);

  if (showStartScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80 p-4">
        <div className="bg-gray-800 text-white rounded-2xl max-w-2xl w-full py-12 px-8 text-center shadow-lg">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-red-600 text-white text-sm rounded-full mb-4">
              ¡Aprende español!
            </span>
            <h1 className="text-5xl font-bold mb-2">Spanish Adventure</h1>
            <p className="text-gray-300 text-xl">Learn Spanish while exploring the city</p>
          </div>

          <div className="my-8 bg-gray-700 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">How To Play</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                { key: 'W', text: 'Move forward (Adelante)' },
                { key: 'A', text: 'Move left (Izquierda)' },
                { key: 'S', text: 'Move backward (Atrás)' },
                { key: 'D', text: 'Move right (Derecha)' },
                { key: 'SPACE', text: 'Jump (Saltar)' },
                { key: 'SHIFT', text: 'Run (Correr)' }
              ].map(({ key, text }) => (
                <div key={key} className="flex items-start space-x-3">
                  <div className="bg-yellow-500 p-2 rounded-lg text-black font-bold">{key}</div>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="flex items-center justify-center space-x-2 mx-auto bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full text-lg transition"
          >
            <Play className="h-5 w-5" />
            <span>¡Comienza! (Start)</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-40 bg-gray-900 bg-opacity-80 shadow-md">
        <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg text-white">
          <Flag className="h-5 w-5 text-yellow-400" />
          <span>Spanish Adventure</span>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={toggleMute}
            className="bg-gray-800 p-3 rounded-lg text-white hover:bg-gray-700 transition"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>

          <button
            onClick={togglePause}
            className="bg-gray-800 p-3 rounded-lg text-white hover:bg-gray-700 transition"
            aria-label={isPaused ? "Resume" : "Pause"}
          >
            {isPaused ? <Play className="h-5 w-5 text-yellow-400" /> : <Pause className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isGameStarted && !isPaused && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 px-6 py-4 rounded-xl text-white shadow-md">
          <span className="block text-xs text-yellow-400 uppercase tracking-wider mb-1">Learn</span>
          <h3 className="text-2xl font-bold">{currentWord.spanish}</h3>
          <p className="text-blue text-sx underline"> English Word</p>
          <p className="text-gray-300">{currentWord.english}</p>
        </div>
      )}

      {isPaused && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-800 text-white rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Paused</h2>
            <p className="text-gray-300 mb-6">Take a break to practice your Spanish!</p>

            <div className="bg-gray-700 p-4 rounded-xl mb-6">
              <h3 className="text-xl font-bold text-yellow-400">Practice:</h3>
              <p className="text-2xl font-bold mt-2">{currentWord.spanish}</p>
              <p className="text-gray-300">{currentWord.english}</p>
            </div>

            <button
              onClick={togglePause}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition"
            >
              Continue (Continuar)
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UI;
