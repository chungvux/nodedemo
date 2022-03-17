
const randomRankLand=()=>{
    let numberRandom = Math.random()
    if(numberRandom<0.85)
        return 1
    if(numberRandom<0.94)
        return 2
    if(numberRandom<0.984)
        return 3
    if(numberRandom<0.994){
        return 4
    }
    if(numberRandom<0.999)
        return 5
    return 6
}

const randomRatio =(array)=>{ //array is sorted by ascending
    let numberRandom = Math.random()
    for(let i=0;i<array.length;){
        if(numberRandom<array[i])
            return i  // return index
        else
            i++
    }
    return array.length
}

module.exports={
    randomRankLand,
    randomRatio
}