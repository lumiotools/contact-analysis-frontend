export function combineData(dataFirst, dataSecond) {
    // Create a map of service levels from dataSecond
    const dataSecondMap = new Map();
    for (const secondEntry of dataSecond) {
        const { Service_Level, ...rest } = secondEntry;
        dataSecondMap.set(Service_Level, rest);
    }

    // Add dataSecond details to dataFirst
    for (const category in dataFirst) {
        const serviceLevels = dataFirst[category];
        for (const level in serviceLevels) {
            if (dataSecondMap.has(level)) {
                serviceLevels[level].DataSecondDetails = dataSecondMap.get(level);
            }
        }
    }

    return dataFirst;
}

// Example usage:
// const result = combineData(dataFirst, dataSecond);
// console.log(result);
