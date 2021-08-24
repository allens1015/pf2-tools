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

ok, that part's done, so now we need to get the rest of the pieces in place on the front, then make the backend go

im confused about how to do skills- i can do the rest
for skills... i have an empty array at the start in the store
and then we're gonna add a {name:name, value:value} as we add more skills
which means the dialog has inputfields but doesnt directly address the store, so...
not an inputfield vue sfc
i think the check box adds the json