import * as sdk from "../imports/index.ts";

async function getList(from: string, to = "") {
    for await (const dirEntry of Deno.readDir(from)) {

        const entryPath = `${from}/${dirEntry.name}`;
        const getPath = entryPath.split('/')
        let dest = `${to}${dirEntry.name}`

        //console.log();
        if (dirEntry.isDirectory) {

            await sdk.CraeteFolder(`./${dest}`);

            await getList(entryPath, `${dest}/`);


        } else if (dirEntry.isFile) {

            await Deno.copyFile(entryPath, `./${dest}`);
        }
    }

}

export default getList;