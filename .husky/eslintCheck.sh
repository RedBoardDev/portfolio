#!/bin/bash


mkdir -p logs

logsDir="logs/"
nbFiles=$(ls -1 $logsDir | wc -l)

if [ $nbFiles -gt 10 ]; then
  oldest=$(ls -1tr $logsDir | head -n 1)
  rm "$logsDir/$oldest"
fi

log_file="logs/latest.log"
if [ -e "$log_file" ]; then
  first_line=$(head -n 1 logs/latest.log)

  file_name="$first_line.log"

  mv logs/latest.log logs/"$file_name"
fi

date "+%d-%m-%Y %H:%M:%S" > logs/latest.log
echo >> logs/latest.log

cd ..
files=$(git diff --cached --name-only -- '*.[tj]s*')
existingFiles=""

rm -rf .lintFiles
mkdir .lintFiles
cp .eslintrc.js .lintFiles/

for file in $files; do
  if [ -f "$file" ]; then
    existingFiles="$existingFiles \"$file\""
    rsync --relative "$file" .lintFiles/
    newPath=".lintFiles/$file"
    git show ":$file" > "$newPath"
  else
    echo "Fichier $file inexistant." >> .husky/logs/latest.log
  fi
done

echo "Fichiers à traiter : $existingFiles" >> .husky/logs/latest.log

if [ -z "$existingFiles" ]; then
  echo "[ESLINT] Rien à traiter."
  echo "Rien à traiter." >> .husky/logs/latest.log
else
  npx eslint .lintFiles/. >> .husky/logs/latest.log

  out=$?
  rm -rf .lintFiles
    if [ $out -ne 0 ]; then
        echo "[ESLINT] Erreur : des fichiers JavaScript existants modifiés ne respectent pas les règles ESLint. Veuillez les corriger avant de valider."
        exit 1
    fi
fi
