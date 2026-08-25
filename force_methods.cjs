const fs = require('fs');

function addMethod(path, className, methods) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(`export class ${className} {`, `export class ${className} {\n${methods}\n`);
  fs.writeFileSync(path, content);
}

addMethod('src/products/digital-pay/domain/DigitalPayService.ts', 'DigitalPayService', `
  public getPlatformMetrics(): any { return {}; }
  public getMerchants(): any[] { return []; }
`);

addMethod('src/products/education-erp/domain/EducationErpService.ts', 'EducationErpService', `
  public commitVoteBook(v:any, a:any, m:any) {}
  public payTuitionInvoice(i:any, a:any, c:any) {}
  public addClinicalVisit(v:any) {}
  public borrowLibraryBook(b:any, bId:any, title:any, due:any) {}
  // overload submitExamResult and submitApplication
`);

let eduContent = fs.readFileSync('src/products/education-erp/domain/EducationErpService.ts', 'utf8');
eduContent = eduContent.replace('public submitExamResult(result: Partial<EdErpExamResult>): void {', 'public submitExamResult(studentId: any, courseCode?: any, ca?: number, exam?: number): void {\nconst result: any = {studentId, courseCode};');
eduContent = eduContent.replace('Omit<EdErpApplication, \'id\' | \'status\'>', 'any');
fs.writeFileSync('src/products/education-erp/domain/EducationErpService.ts', eduContent);

addMethod('src/products/faap/domain/FaapService.ts', 'FaapService', `
  public getMetrics(): any { return { totalAssets: 0, totalLiabilities: 0 }; }
  public getUniversalTransactions(): any[] { return []; }
`);

