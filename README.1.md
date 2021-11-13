# Caesar cipher CLI app
For running the app enter from the root directory:

`node app --action encode --shift 1 --input "input.txt" --output "output.txt"`

Required `--action -a` - ciphering action (encode or decode).

Required `--shift -s` - characters shifting value (-Infinity, +Infinity) excluding decimals.

Optional `--input -i` - path of the input file. If absent, input via command line is available.

Optional `--output -o` - path of the output file. If absent, the result of encoding/decoding appears in terminal.
