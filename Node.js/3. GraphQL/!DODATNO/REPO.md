# 

## kako on loaduje schemae (IZ VIDE-A NA KRAJU RESOLVER POGLAVLJA)

>>>> he schema that you created is gonna be loaded up by this loads type schema. So this loadTypeSchema takes in a name of a schema, like product, coupon, or user. And it reads it from the file system which is asynchronous, grabs it as a string, merges them all together as one big schema, and then passes it to Apollo.