const BONUS=[ // mining
    {
        from:0,
        to:20
    },
    {
        from:20,
        to:50
    },
    {
        from:50,
        to:80
    },
    {
        from:80,
        to:100
    },
    {
        from:100,
        to:150
    },
    {
        from:150,
        to:500
    },
    
]


const RANK_LAND_RATIO=[0.85,0.94,0.984,0.994,0.999,1]

const COMMISSION_RATIO=[0.08,0.04,0.02,0.01,0.005]

module.exports={
    BONUS,
    RANK_LAND_RATIO,
    COMMISSION_RATIO
}