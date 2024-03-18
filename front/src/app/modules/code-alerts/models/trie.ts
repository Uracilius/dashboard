export class TrieNode {
    children: Map<string, TrieNode> = new Map();
    count: number = 0; 
}

export class Trie {
    public root: TrieNode = new TrieNode();

    insert(path: string[]): void {
        let node = this.root;
        for (const part of path) {
            if (!node.children.has(part)) {
                node.children.set(part, new TrieNode());
            }
            node = node.children.get(part)!;
            node.count++;
        }
    }

    findShortestUniquePrefix(path: string[]): string[] {
        let node = this.root;
        const prefix: string[] = [];
        for (const part of path) {
            prefix.push(part);
            node = node.children.get(part)!;
            if (node.count === 1) {
                break; 
            }
        }
        return prefix;
    }

    clear() {
        this.root = new TrieNode(); // Resets the trie
    }
}