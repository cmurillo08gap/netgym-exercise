/**
 * PlayerRow Component
 * 
 * Renders a single player row in the table
 */

export default function PlayerRow({ player, onClick, isSelected }) {
  return (
    <tr
      onClick={() => onClick(player.id)}
      className={`cursor-pointer transition-colors ${
        isSelected
          ? 'bg-blue-100'
          : 'hover:bg-gray-50'
      }`}
    >
      <td className="px-4 py-3 font-medium text-gray-900">{player.player_name}</td>
      <td className="px-4 py-3 text-gray-600">{player.position}</td>
      <td className="px-4 py-3 text-right">{player.games?.toLocaleString()}</td>
      <td className="px-4 py-3 text-right">{player.at_bat?.toLocaleString()}</td>
      <td className="px-4 py-3 text-right">{player.runs?.toLocaleString()}</td>
      <td className="px-4 py-3 text-right font-semibold text-blue-600">{player.hits?.toLocaleString()}</td>
      <td className="px-4 py-3 text-right">{player.double_2b?.toLocaleString()}</td>
      <td className="px-4 py-3 text-right font-semibold text-green-600">{player.home_run?.toLocaleString()}</td>
      <td className="px-4 py-3 text-right">{player.run_batted_in?.toLocaleString()}</td>
      <td className="px-4 py-3 text-right">{player.strikeouts?.toLocaleString()}</td>
      <td className="px-4 py-3 text-right">{player.a_walk?.toLocaleString()}</td>
      <td className="px-4 py-3 text-right text-purple-600">{player.stolen_base?.toLocaleString()}</td>
      <td className="px-4 py-3 text-right font-semibold">{player.avg ? Number(player.avg).toFixed(3) : '-'}</td>
    </tr>
  );
}
