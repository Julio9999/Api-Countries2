const d = document,
$template = d.getElementById('template').content,
$container = d.getElementById('country-container');

export default async function getData(url){
    var k = 0;
    try{
        let res = await fetch(url);
        if(!res.ok) throw {status:res.status, statusText: res.statusText};
        let json = await res.json();
        
        return json;
    }catch(err){
        console.log(err);
    }
    
}

