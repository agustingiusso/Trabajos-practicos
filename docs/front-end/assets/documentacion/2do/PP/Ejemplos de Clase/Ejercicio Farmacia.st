| f r cant rem |

f := Farmacia crearFarmacia: (Prompter prompt: 'Ingrese nombre de la Farmacia').

[MessageBox confirm: 'Desea cargar remedios'] whileTrue: [
	r:= Remedio 
	crear: (Prompter prompt: 'Ingrese nombre del remedio') 
	con: (Prompter prompt: 'Ingrese precio del remedio')asNumber 
	con: (Prompter prompt: 'Ingrese stock del remedio')asNumber 
	con: (Prompter prompt: 'Ingrese laboratorio del remedio').
	f agregarRemedio: r.
].

"Realizar un incremento del 20% a los remedios con stock menor a una cantidad determinada."
cant:= (Prompter prompt: 'Ingrese el stock máximo')asNumber.
(f verTodos) do:[:remedio | 
	(remedio verStock < cant)ifTrue:[remedio modPrecio: (remedio verPrecio * 1.2)]
].
col:= f verTodos.
mod:= col select:[:rem | rem verStock < cant].
mod do: [:rem | rem modPrecio: rem verPrecio * 1.2 ].

"Eliminar remedios del laboratorio Bago"
i:=1.
[i <= f tamanio] whileTrue: [
	rem:= f recuperarRemedio: i.
	(rem verLab = 'Bagó')ifTrue: [f eliminarRemedio: rem] ifFalse: [i:=i+1]
].

col:= f verTodos.
aEliminar := col select:[:rem | rem verLab = 'Bagó'].
aEliminar do:[:rem | f eliminarRemedio: rem].


"Modificar el precio del lotrial."
inc:= (Prompter prompt: 'Ingrese porcentaje a incrementar')asNumber.
(f verTodos) do: [:rem | 
	(rem verNombre = 'Lotrial')ifTrue:[rem modPrecio: (rem verPrecio * (1+(inc / 100))) ]
].

col:= f verTodos.
aMod:= col select:[:rem | rem verNombre = 'Lotrial'].
aMod do:[:rem | rem modPrecio: (rem verPrecio * (1+(inc / 100))) ]