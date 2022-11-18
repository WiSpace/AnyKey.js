const minimist = require('minimist');
const prompt = require("prompt-sync")({ sigint: true });
const fs = require('fs');

let rawArguments=process.argv.slice(2);
let arguments = minimist(rawArguments, {
    alias: {
        h: 'help',
        V: 'version'
    }
});

const NowType = {"fun": 0, "sred": 1, "val": 2};
const Fun = {"out": 0, "in": 1, "outin": 2, "outl": 3};

if (arguments.v || arguments.version)
    console.log("1.0");
else if (arguments.h || arguments.help)
    console.log("node AnyKey.js [arguments] path\n\t-V or -version: AnyKey.js version\n\t-h or -help: get help\n\nto get help on AnyKey Lang read docs");
else if (arguments._.length>0) {
    const file_path = arguments._[0];
    const code = fs.readFileSync(file_path).toString();
    let now = NowType.fun;
    let fun;
    let inp;

    for (var i=0; i<code.length; i++)
    {
        const char = code.charAt(i);
        
        switch (now)
        {
            case NowType.fun:
                now = NowType.sred;
                switch (char)
                {
                    case "a":
                        fun = Fun.out;
                        break;
                    case "b":
                        fun = Fun.in;
                        break;
                    case "c":
                        fun = Fun.outin;
                        break;
                    case "d":
                        fun = Fun.outl;
                        break;
                    default:
                        fun = Fun.out;
                        break;
                }
                break;
            case NowType.sred:
                now = NowType.val;
                break;
            case NowType.val:
                now = NowType.fun;
                switch (fun)
                {
                    case Fun.out:
                        process.stdout.write(char);
                        break;
                    case Fun.in:
                        inp = prompt("");
                        break;
                    case Fun.outin:
                        process.stdout.write(inp);
                        break;
                    case Fun.outl:
                        console.log(char);
                        break;
                }
                break;
        }
    }
} else
    console.error("error: undefine first argument: path\n\tfor help write \"node AnyKey.js -h\"");
