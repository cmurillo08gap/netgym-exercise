/**
 * EditFields Component
 * 
 * Renders 8 editable input fields for player stats
 */

export default function EditFields({ values, onChange }) {
  const fields = [
    { key: 'games', label: 'Games' },
    { key: 'at_bat', label: 'At Bats' },
    { key: 'runs', label: 'Runs' },
    { key: 'hits', label: 'Hits' },
    { key: 'double_2b', label: 'Doubles (2B)' },
    { key: 'home_run', label: 'Home Runs' },
    { key: 'run_batted_in', label: 'RBIs' },
    { key: 'strikeouts', label: 'Strikeouts' },
  ];

  const handleChange = (key, value) => {
    // Convert to number, ensure non-negative
    const numValue = Math.max(0, parseInt(value) || 0);
    onChange({ ...values, [key]: numValue });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {fields.map(({ key, label }) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          <input
            type="number"
            min="0"
            value={values[key] ?? ''}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      ))}
    </div>
  );
}
