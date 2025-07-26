/** To display the results of an encounter's side effects */

import { itemizeSideEffect } from "../logic/sideEffect";
import { SideEffect } from "../types/SideEffect";

export function SideEffectList({ sideEffect }: { sideEffect: SideEffect }) {
  const itemized = itemizeSideEffect(sideEffect);
  return (
    <div className="side-effect-list">
      <table>
        <tbody>
          {itemized.map((entry) => (
            <tr key={entry[0]}>
              <th>{entry[0]}</th>
              <td>{entry[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
