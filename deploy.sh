#!/bin/sh

lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USERNAME,$FTP_PASSWORD $FTP_SERVER;
cd htdocs;
rm -rf *;
lcd build;
mirror --reverse --delete --verbose ./
bye
"