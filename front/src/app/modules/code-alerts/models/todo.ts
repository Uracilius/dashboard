export class Todo {
  numOfLines: number;
  status: string;
  text: string;
  meta: string;

  constructor(numOfLines: number, status: string, text: string, meta: string) {
    this.numOfLines = numOfLines;
    this.status = status;
    this.text = text;
    this.meta = meta;
  }
}