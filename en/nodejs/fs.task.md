# stat vs access
Using fs.stat() to check for the existence of a file before calling fs.open(), fs.readFile(), or fs.writeFile() is not recommended. Instead, user code should open/read/write the file directly and handle the error raised if the file is not available.

To check if a file exists without manipulating it afterwards, fs.access() is recommended.