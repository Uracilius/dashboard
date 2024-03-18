export class Todo {
  filePath: string;
  numOfLines: number;
  status: string;
  text: string;
  meta: string;

  constructor(numOfLines: number, status: string, text: string, meta: string, filePath: string) {
    this.filePath = filePath; 
    this.numOfLines = numOfLines;
    this.status = status;
    this.text = text;
    this.meta = meta;
  }
}