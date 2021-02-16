import { toast } from 'react-toastify';
export const checkFile = (event , files) =>{
    //const files = event.target.files;
    let error = '';
    const types = ['image/jpeg' , 'image/png' , 'image/jpg'];
    for(let i=0 ; i<files.length ; i++) {
        const checkItems = types.every(type => files[i].type !== type)
        if(checkItems) {
            error = 'please select one of jpeg, jpg or png format'
        }

        if(error!== '') {
            event.target.value = null;
            toast.error(error);
            return false
        }
        return true
    }
}

export const maxSelectedFile = (event , files) =>{
    //const files = event.target.files;
    let error = '';
    if(files.length > 3) {
        event.target.value = null;
        error = 'number of files should not be more than 3'
        toast.error(error)
        return false
    }
    return true
}

export const MaxSizeFile = (event , files) =>{    
    //const files = event.target.files;    
    let error = '';
    let maxSize = 3000000;
    for(let i=0 ; i<files.length ; i++) {
        console.log(files[i].size);       
        if(files[i].size > maxSize) {
            error = `${files[i].size} is bigger than max size`
            
        }

    }
    if(error!== '') {
        event.target.value = null;
        toast.error(error);
        return false
    }

    return true
}