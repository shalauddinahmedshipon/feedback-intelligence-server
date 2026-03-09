export const prompt =(text:string)=>{
    return `
    You are an expert support ticket classifier. 
    Classify this feedback: "${text}"

    Output ONLY a JSON object with these keys:
    - category: (bug, feature, billing, ux, security, performance, other)
    - priority: (low, medium, high, urgent)
    - sentiment: (positive, neutral, negative)
    - team: (engineering, product, support, billing, security, design)

    Format your response as valid JSON.
  `;
} 