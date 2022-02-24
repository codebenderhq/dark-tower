// @ts-ignore
import * as sdk from "../../imports/index.ts";
const directory = `./${sdk.env.get('watch')}/`
const sdkDirectory = `./${sdk.env.get('sdk')}`


const update = () => {

    const getPath = (pathDir:Array<string>) => {

        let newPath = ''
        let key: number
        pathDir.map((path: string, k: number) => {

            if (path == sdk.env.get('watchFsName')) {
                key = k
            }

            if (k > key) {
                newPath += `/${path}`
            }
        })

        return newPath;
    }

    const createDirPath = (dir: string) => {

        let pathDir = dir.split('\\');

        if (pathDir.length == 1) {
            pathDir = dir.split('/')
        }

        return pathDir
    }
    // @ts-ignore
    const deleteFile = async (dir) => {

        let pathDir = createDirPath(dir)

        let deleteFile = getPath(pathDir)
         //
         // console.log('>>>deleted',`${sdkDirectory}${deleteFile}`)
         await Deno.remove(`${sdkDirectory}${deleteFile}`,{ recursive: true });
    }
    // @ts-ignore
    const checkFile = async () => {
        let count = 0
        const watcher = Deno.watchFs(directory);

        for await (const event of watcher) {
            try{

                if (event.kind == "modify") {
                    //support directory being moved
                    let updatedFile = getPath(createDirPath(event.paths[0]))

                    try{
                        let updatedFileArray = createDirPath(updatedFile).filter(item => item !=  "")
                        let file = updatedFileArray.pop()
                        // console.log('file changed',` ${file}`)
                        // console.log('path to update',updatedFileArray)
                        let path = ""
                        let relativePath = ""
                        // @ts-ignore
                        if(file.includes('.')){
                             path = updatedFileArray.join('/')
                            if(path.length > 0){
                                relativePath = `/${path}/${file}`
                            }else {
                                relativePath = `/${file}`
                            }

                        }

                        if(relativePath !== ""){
                            // console.log('file to move',`${sdkDirectory}${relativePath}`)
                            await Deno.remove(`${sdkDirectory}${relativePath}`);
                        }


                    }catch (e) {
                        console.log('no file movement')
                    }

                    // console.log(">>>> updated",sdkDirectory);
                    await sdk.copyDirectory(directory, `${sdkDirectory}/`)
                    watcher.close()
                }

                if (event.kind == "remove") {
                    count += 1
                    await deleteFile(event.paths[0])
                }


            }catch (e){
                console.log('file already not in main')
            }



        }

        checkFile()
    }

    const upgradeFile = async () => {

        await sdk.copyDirectory(sdkDirectory, `${directory}/`)
        console.log('upgrading completed')
    }

    if(Deno.args[1] == "upgrade"){
        console.log('upgrading current sdk')
        upgradeFile()

    }else{
        // checkFile()
        console.log('watching the files to update',directory)
    }
}


export default update