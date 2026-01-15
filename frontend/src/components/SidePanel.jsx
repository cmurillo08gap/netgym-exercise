/**
 * SidePanel Component
 * 
 * Slide-in panel (desktop) / Full-screen modal (mobile)
 * Shows player description and editable stats
 */

import { useState, useEffect } from 'react';
import { fetchPlayerById, updatePlayer } from '../services/api';
import EditFields from './EditFields';

export default function SidePanel({ playerId, onClose, onSave }) {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [editValues, setEditValues] = useState({});

  // Fetch player details when playerId changes
  useEffect(() => {
    if (!playerId) return;

    const loadPlayer = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPlayerById(playerId);
        setPlayer(data);
        // Initialize edit values with current stats
        setEditValues({
          games: data.games,
          at_bat: data.at_bat,
          runs: data.runs,
          hits: data.hits,
          double_2b: data.double_2b,
          home_run: data.home_run,
          run_batted_in: data.run_batted_in,
          strikeouts: data.strikeouts,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPlayer();
  }, [playerId]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await updatePlayer(playerId, editValues);
      onSave(); // Trigger list refresh
      onClose(); // Close panel
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!playerId) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Side Panel */}
      <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {loading ? 'Loading...' : player?.player_name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700 mb-4">
              {error}
            </div>
          ) : (
            <>
              {/* Player Description */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  About
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {player?.description || (
                    <span className="text-gray-400 italic">Generating description...</span>
                  )}
                </p>
              </div>

              {/* Player Position & Basic Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Position:</span>
                    <span className="ml-2 font-medium">{player?.position}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">AVG:</span>
                    <span className="ml-2 font-medium">{player?.avg}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">OBP:</span>
                    <span className="ml-2 font-medium">{player?.on_base_percentage}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">OPS:</span>
                    <span className="ml-2 font-medium">{player?.on_base_plus_slugging}</span>
                  </div>
                </div>
              </div>

              {/* Editable Stats */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
                  Edit Stats
                </h3>
                <EditFields values={editValues} onChange={setEditValues} />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
