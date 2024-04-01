import { Injectable } from '@angular/core';
import { Trie } from '../models/trie';
import { FileNameDTO } from '../models/DTOs';
@Injectable({
  providedIn: 'root'
})
export class PathNameGeneratorService {
  
  private trie: Trie = new Trie();
  private separator: string = "\\"; 

  processPaths(paths: FileNameDTO[]): void {
    this.trie.clear();
    paths.map(path => path.filePath.split(this.separator)).forEach(path => this.trie.insert(path));
  }

  generateDynamicDisplayPaths(paths: FileNameDTO[]): string[] {
    return paths.map(path => {
        const splitPath = path.filePath.split(this.separator);
        const uniquePrefix = this.trie.findShortestUniquePrefix(splitPath)
        return uniquePrefix.join(this.separator);
    });
  }
}
