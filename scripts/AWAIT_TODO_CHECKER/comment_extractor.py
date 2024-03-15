##completely AI generated cuz I don't have time to write this out manually and the task is quite simple

import re
import sys
import csv

PATH_TO_WRITE = "../../backend/src/resources/report.csv"

def search_and_extract_comments(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Adjusted regex to include '//AWAIT' in the capture
    pattern = re.compile(r'(//AWAIT[^\n]*((?:\n[^\n]+)*))\n\n', re.MULTILINE)
    matches = pattern.findall(content)

    # Extract only the full matched comments, not the subgroups
    matches = [match[0] for match in matches]

    return matches


def process_files(file_list_path):
    comments_report = {}
    with open(file_list_path, 'r', encoding='utf-8') as list_file:
        for file_path in list_file:
            file_path = file_path.strip()  # Remove whitespace and newline characters
            if not file_path:
                continue  # Skip empty lines
            comments = search_and_extract_comments(file_path)
            if comments:
                comments_report[file_path] = comments

    return comments_report

def write_report(comments_report, report_file=PATH_TO_WRITE):
    with open(report_file, 'w', encoding='utf-8', newline='') as file:
        writer = csv.writer(file)
        # Assuming each comment is now its own row, adjust the header as necessary
        writer.writerow(['File', 'Comment ID', 'Status', 'Text', 'Meta'])
        for file_path, comments in comments_report.items():
            for comment_id, comment in enumerate(comments, start=1):
                status = 'AWAIT'
                # Replace newline characters within the comment to keep the CSV format intact
                text = comment.replace('\n', '\\n')
                # For the meta, assuming you still want the first line of the comment without '//AWAIT'
                meta = parse_meta_info(comment)
                writer.writerow([file_path, comment_id, status, text, meta])
    print(f"Report written to {report_file}")

def parse_meta_info(comment):
    # Extract the first line and remove '//AWAIT' and leading/trailing whitespace
    return comment.split('\n', 1)[0].strip('//').strip()



if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python search_comments.py <file_list_path>")
        sys.exit(1)
    
    file_list_path = sys.argv[1]
    comments_report = process_files(file_list_path)  # Process the files to get the comments report
    write_report(comments_report)  # Write the report
