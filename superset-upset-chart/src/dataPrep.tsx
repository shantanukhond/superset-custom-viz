export interface GenericDataItem {
  [key: string]: any;
}

interface TransformedDataItem {
  name: string; // Unique value from secondCol
  elems: string[]; // Associated values from firstCol
}

function transformData(
  data: GenericDataItem[],
  firstCol: string,
  secondCol: string
): TransformedDataItem[] {
  if (!data.length || !data[0].hasOwnProperty(firstCol) || !data[0].hasOwnProperty(secondCol)) {
    throw new Error(`Invalid column names: '${firstCol}' or '${secondCol}' not found in data.`);
  }

  // Group `firstCol` values by `secondCol` values
  const groupedData: { [key: string]: Set<string> } = {};

  data.forEach(item => {
    const colTwoValue = item[secondCol];
    const colOneValue = item[firstCol];

    if (!groupedData[colTwoValue]) {
      groupedData[colTwoValue] = new Set();
    }

    groupedData[colTwoValue].add(colOneValue);
  });

  // Transform the grouped data into the desired output format
  const result: TransformedDataItem[] = Object.entries(groupedData).map(([key, valueSet]) => ({
    name: key, // Unique value of secondCol
    elems: Array.from(valueSet), // Associated firstCol values as an array
  }));

  return result;
}

export default transformData;
