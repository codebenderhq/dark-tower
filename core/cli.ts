
// @ts-ignore
import Update from '../io/update/index.ts'


// @ts-ignore
if (import.meta.main) {

  const expr = Deno.args[0];
  switch (expr) {
    case 'server':
      console.log('Launching Server');
      break;
    case 'darktower':
      Update()
      break;
    default:
      console.log(`Sorry, you need to select and option checkout --help to find out what is available`);
  }
}