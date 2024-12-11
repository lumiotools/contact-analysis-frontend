export const parseJson=(data)=>{

// const data = `
// DATA FROM analyze_contracts API
// `;

const pattern = /Service\sLevel:\s(?<service_level>[^\n]+)\nAverage\sDiscount:\s(?<average_discount>[\d.]+)\nMin\sDiscount:\s(?<min_discount>[\d.]+)\nMax\sDiscount:\s(?<max_discount>[\d.]+)\nContract\sCount:\s(?<contract_count>\d+)\nDiscount\sValues:\s(?<discount_values>.+)/g;

const results = [];
let match;

while ((match = pattern.exec(data)) !== null) {
    results.push({
        "Service Level": match.groups.service_level,
        "Average Discount": parseFloat(match.groups.average_discount),
        "Min Discount": parseFloat(match.groups.min_discount),
        "Max Discount": parseFloat(match.groups.max_discount),
        "Contract Count": parseInt(match.groups.contract_count, 10),
        "Discount Values": match.groups.discount_values.split(",").map(v => parseFloat(v.trim()))
    });
}

const jsonOutput = JSON.stringify(results, null, 4);

console.log(jsonOutput);
return jsonOutput;
}