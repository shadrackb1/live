import React, { useState, useEffect } from 'react';
import { LiveSetup } from './components/LiveSetup';
import { LiveStream } from './components/LiveStream';
import { DisclaimerModal } from './components/DisclaimerModal';
import { StreamConfig } from './types';

const App: React.FC = () => {
  const [hasAckDisclaimer, setHasAckDisclaimer] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [config, setConfig] = useState<StreamConfig | null>(null);

  useEffect(() => {
    // Check local storage for previous ack, though for demo we usually show it every time
    // for strict educational compliance. We'll just reset on refresh for safety.
  }, []);

  const handleStartLive = (newConfig: StreamConfig) => {
    setConfig(newConfig);
    setIsLive(true);
  };

  const handleEndLive = () => {
    setIsLive(false);
    // Optional: Reset config or keep it
  };

  return (
    <div className="antialiased">
      {!hasAckDisclaimer && (
        <DisclaimerModal onAck={() => setHasAckDisclaimer(true)} />
      )}

      <main className="h-screen w-full flex justify-center bg-zinc-950">
        {/* Mobile Container Restriction for Desktop View */}
        <div className="w-full h-full md:max-w-[420px] md:h-[90vh] md:my-auto md:rounded-3xl md:overflow-hidden md:border-[8px] md:border-zinc-800 md:shadow-2xl relative bg-black">
          
          {isLive && config ? (
            <LiveStream config={config} onEnd={handleEndLive} />
          ) : (
            <LiveSetup onStart={handleStartLive} />
          )}
          
        </div>
      </main>
    </div>
  );
};

export default App;
