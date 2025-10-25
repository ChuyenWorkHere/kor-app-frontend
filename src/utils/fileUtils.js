import ExcelJS from 'exceljs';

//Vocabulary excel file upload
export const parseExcelFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const workbook = new ExcelJS.Workbook();
                await workbook.xlsx.load(e.target.result);
                const worksheet = workbook.worksheets[0];
                const cards = [];
                worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
                    if (rowNumber === 1) return; // Bỏ header
                    const word = row.getCell(1).value;
                    const definition = row.getCell(2).value;
                    if (word && definition) {
                        cards.push({ id: null, word: String(word), definition: String(definition) });
                    }
                });
                resolve(cards);
            } catch (error) {
                reject(error);
            }
        };
        reader.readAsArrayBuffer(file);
    });
};