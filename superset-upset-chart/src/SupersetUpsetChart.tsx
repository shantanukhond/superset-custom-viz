import React, { useState } from 'react';
import { SupersetUpsetChartProps } from './types';
import UpSetJS, { extractCombinations, ISetLike } from '@upsetjs/react';
import ProcessData, {DataItem} from './dataPrep';

export default function SupersetUpsetChart(props: SupersetUpsetChartProps) {
  const { data } = props;
  const dataArray: DataItem[] = JSON.parse(JSON.stringify(data));

  const vennData = ProcessData(dataArray);

  const { sets } = extractCombinations(vennData);

  const UpSetJSSelection = () => {
    const [selection, setSelection] = useState<ISetLike<any> | null>(null);
  
    return <UpSetJS sets={sets} {...props} selection={selection} onHover={setSelection} />;
  };


  return (
    <div>
      <UpSetJSSelection />
    </div>
  );
}