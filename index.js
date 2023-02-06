const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if(err) reject('I COULD NOT FIND THAT FILE 😭')
            resolve(data);
        })
    })
}

const writeFilePro = (file, data) => {
    return new Promise((resolve,reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('COULD NOT WRITE FILE 😔');
            resolve('sucess');
        })
    })
}

const getDogPic = async() => {
    try{

        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        const res1Pro = superagent.get (
            `https://dog.ceo/api/breed/${data}/images/random`);

        const res2Pro = superagent.get (
            `https://dog.ceo/api/breed/${data}/images/random`);
            
        const res3Pro = superagent.get (
            `https://dog.ceo/api/breed/${data}/images/random`);
        
        const all = await Promise.all([res1Pro,res2Pro,res3Pro]);
        const imgs = all.map(el => el.body.message)
        
        console.log(imgs);

        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log('RANDOM DOGS IMAGES SAVED TO FILE! 🐶');

    } catch (err){
        console.log(err);
        throw(err)
    }
    return 'YOUR PICS ARE READY! 😍'
};

(async () => {
try{
    console.log('WILL GET DOGS PICS! 😎')
    const x = await getDogPic();
    console.log('DONE GETTING DOGS PICS! 😉');
    console.log(x);

    }catch(err){
        console.log('ERROR 😤');
    }
})();


/*
console.log('WILL GET DOG PICS! 😎')
getDogPic().then(x => {
    console.log(x);
    console.log('DONE GETTING DOG PICS! 😉');
})

.catch(err =>{
    console.log('ERROR 😤');
})
*/


/*
readFilePro(`${__dirname}/dog.txt`)
    
    .then(data => {
    console.log(`Breed: ${data}`);
    return superagent.get (`https://dog.ceo/api/breed/${data}/images/random`)
})
    .then(res => {
        console.log(res.body.message);
        return writeFilePro('dog-img.txt', res.body.message)
    })
    
    .then(()=> {
        console.log('Random dog image saved to file! 🐶');
    })

    .catch(err => {
        console.log(err.message);
    });
*/