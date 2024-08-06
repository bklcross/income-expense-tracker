import fs from "fs";

// Helper function to read data from the JSON file
export const readData = (filePath: string): any[] => {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

// Helper function to write data to the JSON file
export const writeData = (filePath: string, data: any[]) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};
