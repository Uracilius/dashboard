import { Injectable } from '@angular/core';
import { Trie } from '../models/trie';
@Injectable({
  providedIn: 'root'
})
export class PathNameGeneratorService {
  
  private trie: Trie = new Trie();
  private separator: string = "\\"; 

  processPaths(paths: string[]): void {
    this.trie.clear();
    paths.map(path => path.split(this.separator)).forEach(path => this.trie.insert(path));
  }

  generateDynamicDisplayPaths(paths: string[]): string[] {
    return paths.map(path => {
        const splitPath = path.split(this.separator);
        const uniquePrefix = this.trie.findShortestUniquePrefix(splitPath)
        return uniquePrefix.join(this.separator);
    });
  }
}
