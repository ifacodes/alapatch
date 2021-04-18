import Timbre from './Timbre';
import Vocoder from './Vocoder';
import Effects from './Effects';
import { useSelector } from 'react-redux';

export default function Editor() {
  const activeTab = useSelector((state) => state.parameters.activeTab);
  return (
    <div className="col-span-5 overflow-y-auto overscroll-contain">
      {activeTab === 'Timbre1' ? <Timbre id="timbre1" /> : null}
      {activeTab === 'Timbre2' ? <Timbre id="timbre2" /> : null}
      {activeTab === 'Vocoder' ? <Vocoder id="vocoder" /> : null}
      {activeTab === 'Effects' ? <Effects id="effects" /> : null}
    </div>
  );
}
