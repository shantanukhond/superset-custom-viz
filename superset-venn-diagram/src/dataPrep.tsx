// import React from 'react';

// type DataItem = {
//   project: string;
//   village: string;
// };

// type ProjectGroup = {
//     sets: string[];
//     count: number;
// };

const ProcessData = (data: any[]): { set: string[], count: number }[] => {
    // Map to track which projects are associated with each village

    const first_col = Object.keys(data[0])[0]
    const second_col = Object.keys(data[0])[1]

    console.log(first_col,second_col)

    // var initRes: [val:string, groups:string[]][] = []
    // var nameKey = {}
    const grouped: Record<string, string[]> = {};


    data.forEach((pv)=>{

        const group:string = pv[first_col]
        const value:string = pv[second_col]

        if (!grouped[value]) {
            grouped[value] = [];
        }
        grouped[value].push(group);
       
    })

   const final_res = transformToCountArray(grouped)

   
    // console.log(grouped)

    // const villageProjectMap = new Map();

    // data.forEach(({ project, village }) => {
    //     if (!villageProjectMap.has(village)) {
    //         villageProjectMap.set(village, new Set());
    //     }
    //     villageProjectMap.get(village).add(project);
    // });

    // const projectGroups = new Map();

    // villageProjectMap.forEach((projects) => {
    //     const projectSet = Array.from(projects).sort(); // Sort to ensure consistent grouping
    //     const key = projectSet.join(','); // Use a comma-separated string as the key

    //     if (!projectGroups.has(key)) {
    //         projectGroups.set(key, { sets: projectSet, count: 0 });
    //     }
    //     projectGroups.get(key).count++;
    // });

    // // Convert to final output format
    // return Array.from(projectGroups.values());
    return final_res
};


// const App: React.FC = () => {
//   const data: DataItem[] = [
//     { project: 'p1', village: 'v1' },
//     { project: 'p1', village: 'v' },
//     { project: 'p2', village: 'v1' },
//     { project: 'p1', village: 'v2' },
//     { project: 'p3', village: 'v3' },
//     { project: 'p3', village: 'v7' },
//     { project: 'p1', village: 'v4' },
//     { project: 'p2', village: 'v4' },
//     { project: 'p3', village: 'v4' },
//     { project: 'p1', village: 'v9' },
//     { project: 'p2', village: 'v9' },
//     { project: 'p3', village: 'v9' },
//   ];

type GroupedData = { [key: string]: string[] };

function transformToCountArray(grouped: GroupedData): { set: string[], count: number }[] {
    const result: { set: string[], count: number }[] = [];

    // Loop through the grouped data
    Object.values(grouped).forEach((keysArray) => {
        // Check if the set already exists in the result array
        const existing = result.find(item => JSON.stringify(item.set.sort()) === JSON.stringify(keysArray.sort()));

        if (existing) {
            // If the set already exists, increment its count
            existing.count++;
        } else {
            // If the set doesn't exist, add it with count 1
            result.push({ set: keysArray, count: 1 });
        }
    });

    return result;
}

export default ProcessData

//   const finalResult = processData(data);

//   return (
//     <div>
//       <h1>Project Groups</h1>
//       <ul>
//         {finalResult.map((group, index) => (
//           <li key={index}>
//             <strong>Projects:</strong> {group.sets.join(', ')} | <strong>Count:</strong> {group.count}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;
