import React, { useState } from 'react';
import { SupersetUpsetChartProps } from './types';
import UpSetJS, {  ISetLike, asSets } from '@upsetjs/react'; //extractCombinations,
import ProcessData from './dataPrep';

export default function SupersetUpsetChart(props: SupersetUpsetChartProps) {
  const { data } = props;
  const dataArray = JSON.parse(JSON.stringify(data));
  
  const keys = Object.keys(data[0]); // Get keys of the first object
  const firstTwoColumns = keys.slice(0, 2); // Get the first two keys



  const vennData = ProcessData(dataArray, firstTwoColumns[0], firstTwoColumns[1]);
  console.log(vennData);
  // const { sets } = extractCombinations(dummyData);
  const sets = asSets(vennData);

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