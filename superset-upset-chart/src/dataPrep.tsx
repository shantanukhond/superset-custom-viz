export interface DataItem {
    village_id: string;
    project: string;
    count: number;
  }
  
  interface TransformedDataItem {
    sets: string[];
    size: number;
  }
  
  function transformData(data: DataItem[]): TransformedDataItem[] {
    // Get unique projects
    const projects: string[] = [...new Set(data.map(item => item.project))];
  
    // Initialize result
    let result: TransformedDataItem[] = [];
  
    // Loop through all possible combinations of projects
    for (let i = 1; i <= projects.length; i++) {
      const combinations: string[][] = getCombinations(projects, i);
      combinations.forEach(combination => {
        // Filter data for current combination of projects
        const filteredData: DataItem[] = data.filter(item => combination.includes(item.project));
  
        // Append result
        result.push({
          sets: combination,
          size: filteredData.length
        });
      });
    }
  
    return result;
  }
  
  // Function to get all combinations of an array
  function getCombinations(array: string[], size: number): string[][] {
    const combinations: string[][] = [];
    const recursive = (current: string[], start: number) => {
      if (current.length === size) {
        combinations.push([...current]);
        return;
      }
      for (let i = start; i < array.length; i++) {
        current.push(array[i]);
        recursive(current, i + 1);
        current.pop();
      }
    };
    recursive([], 0);
    return combinations;
  }
  
export default transformData;