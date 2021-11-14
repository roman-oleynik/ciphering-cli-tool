# ciphering-cli-tool

# Description
This app uses three types of latin text encoding: Caesar, ROT-8, Atbash. You can set them in the following way:
**C1** - Encoding using Caesar cipher,
**C0** - Decoding using Caesar cipher,
**R1** - Encoding using ROT-8 cipher,
**R0** - Decoding using ROT-8 cipher,
**A** - Encoding using Atbash cipher. For decoding use this key repeatedly.

## Run
`
node app --action C1-C1-R0-A -i input.txt -o output.txt
`
Also, you may not use flags *-i* and *-o* (*--input* and *--output* correspondingly). The app allows you to write and read data via command line.