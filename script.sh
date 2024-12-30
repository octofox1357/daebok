#!/bin/bash

# 옵션 파싱을 위한 초기화
process_client=false
process_server=false
print_paths_only=false

while getopts ":csph" opt; do
  case $opt in
    c)
      # client 폴더만 처리
      process_client=true
      ;;
    s)
      # server 폴더만 처리
      process_server=true
      ;;
    p)
      # 파일 위치와 파일명만 출력(파일 내용은 출력하지 않음)
      print_paths_only=true
      ;;
    h)
      echo "사용법: $0 [-c] [-s] [-p]"
      echo "  -c    client 폴더만 처리"
      echo "  -s    server 폴더만 처리"
      echo "  -p    파일 위치와 파일명만 출력"
      exit 0
      ;;
    \?)
      echo "유효하지 않은 옵션: -$OPTARG" >&2
      exit 1
      ;;
  esac
done

# 플래그가 없으면 모든 디렉토리 처리
if ! $process_client && ! $process_server; then
  process_client=true
  process_server=true
fi

# Next.js(또는 기타) 프로젝트에서 처리할 주요 디렉토리 설정
directories=("./app" "./prisma" "./public")

# 출력 파일 설정
current_dir=$(pwd)
output_file="$current_dir/app_content_output.txt"

# 기존 파일 내용을 지우고 새로운 파일 생성
> "$output_file"

# 제외할 디렉토리 및 파일 목록
excluded_dirs=("node_modules" ".next" "dist" "build" "out" ".git" ".svelte-kit" "epubs" "cache")
excluded_files=("database.sqlite" "data.json" "data2.json" "package-lock.json" "*.epub" "*.lockb" "*.png" "*.DS_Store" "*.sqlite" "*.jpg" "*.jpeg" "*.gif" "*.lock" "*.yaml" "*.yml")

# 포함할 파일 확장자 설정
include_exts=("*.ts" "*.tsx" "*.js" "*.jsx" "*.json" "*.css" "*.html" "*.md" "*.svelte")

# find 명령어 구성
find_cmd=(find "${directories[@]}")

# 제외할 디렉토리 추가
for dir in "${excluded_dirs[@]}"; do
  find_cmd+=(-path "*/$dir/*" -prune -o)
done

# 제외할 파일 추가
for file in "${excluded_files[@]}"; do
  find_cmd+=(-name "$file" -prune -o)
done

# 크기가 큰 파일 제외(예: 1M 초과)
find_cmd+=(-size +1M -prune -o)

# 포함할 파일 확장자에 따라 파일 찾기
name_expr=()
for ext in "${include_exts[@]}"; do
  name_expr+=(-name "$ext" -o)
done
# 마지막 -o 제거
if [ "${#name_expr[@]}" -gt 0 ]; then
  unset 'name_expr[$((${#name_expr[@]} - 1))]'
fi

# find 명령어에 조건 추가
find_cmd+=(-type f \( "${name_expr[@]}" \) -print)

# 파일 트리와 내용을(또는 경로만) 출력
"${find_cmd[@]}" | while IFS= read -r file; do
  if $print_paths_only; then
    # 파일 경로와 이름만 출력
    echo "==== FILE: $file ====" >> "$output_file"
  else
    # 파일 경로와 내용을 모두 출력
    echo "==== FILE: $file ====" >> "$output_file"
    cat "$file" >> "$output_file"
    echo "" >> "$output_file"
  fi
done

echo "결과가 $output_file 에 저장되었습니다."