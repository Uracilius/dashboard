import re
import sys
import csv
import uuid

PATH_TO_WRITE = "../../backend/src/resources/report.csv"

def search_and_extract_comments(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # This pattern captures both the comment line and the associated block of code
    pattern = re.compile(r'(//(AWAIT|TODO).*)(?=\n)((?:\n[^\n]+)*)', re.MULTILINE)
    matches = pattern.findall(content)

    # Return a list of tuples: (entire block including comment, comment line, type)
    return [(match[0] + match[2], match[0], match[1]) for match in matches]

def process_files(file_list_path):
    comments_report = {}
    with open(file_list_path, 'r', encoding='utf-8') as list_file:
        for file_path in list_file:
            file_path = file_path.strip()
            if not file_path:
                continue
            comments = search_and_extract_comments(file_path)
            if comments:
                comments_report[file_path] = comments

    return comments_report

def write_report(comments_report, report_file=PATH_TO_WRITE):
    with open(report_file, 'w', encoding='utf-8', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['ID', 'FilePath', 'Status', 'Code', 'Meta'])
        for file_path, comments in comments_report.items():
            for (code_block, comment_line, ctype) in comments:
                id = str(uuid.uuid4())
                status = ctype
                code = code_block.replace('\n', '\\n')
                meta = comment_line  # Just the comment line for Meta
                writer.writerow([id, file_path, status, code, meta])
    print(f"Report written to {report_file}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python search_comments.py <file_list_path>")
        sys.exit(1)
    
    file_list_path = sys.argv[1]
    comments_report = process_files(file_list_path)
    write_report(comments_report)
