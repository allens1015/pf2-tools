monsterman

so here's the plan-
if i get the tables for the 2e monster rules into digimal
i can create an app that looks at cr, looks at intended cr, and grabs those values, references the tables, and then i dont have to think about it

the core is gonna be recording the data

always level
five variants- extreme high moderate low terrible
so, array where the level is the index

so it's
//data 
[
    //level -1
    [x,x,x,x,x],
    //level 0
    [x,x,x,x,x],
    ...
]

data[0] is level -1 array
[-, +3, +2, +0, -]


so whats the play here:
mimic the organization of a monster in formatting and inputs, have a cr from/to at the top


vue child structure is fucked and weird

ok, better plan: use a class model and reference that instead of passing garbage up
working on the laptop