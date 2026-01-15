/**
 * Baseball Players App
 * 
 * Main application component that orchestrates the player list,
 * sorting controls, and side panel for viewing/editing players.
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchPlayers } from './services/api';
import SortControls from './components/SortControls';
import PlayerList from './components/PlayerList';
import SidePanel from './components/SidePanel';

function App() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('hits');
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  // Fetch players when sortBy changes
  const loadPlayers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPlayers(sortBy);
      setPlayers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [sortBy]);

  useEffect(() => {
    loadPlayers();
  }, [loadPlayers]);

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handlePlayerClick = (playerId) => {
    setSelectedPlayerId(playerId);
  };

  const handlePanelClose = () => {
    setSelectedPlayerId(null);
  };

  const handleSave = () => {
    // Refresh the player list after saving
    loadPlayers();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            ⚾ Baseball Players
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Sort Controls */}
        <SortControls sortBy={sortBy} onSortChange={handleSortChange} />

        {/* Player List */}
        <PlayerList
          players={players}
          loading={loading}
          error={error}
          selectedPlayerId={selectedPlayerId}
          onPlayerClick={handlePlayerClick}
        />
      </main>

      {/* Side Panel */}
      {selectedPlayerId && (
        <SidePanel
          playerId={selectedPlayerId}
          onClose={handlePanelClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default App;
