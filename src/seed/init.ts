import {createAll} from "./index";

async function run() {
    console.log("Started creating seed");
    await createAll();
}

run () 
    .then(async() => {
        console.log("Done creating sedd");

        process.exit(1);
    }).catch(err => {
        console.log(err);
        return 1;
    })
