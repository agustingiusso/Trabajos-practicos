"Filed out from Dolphin Smalltalk 7"!

Object subclass: #Remedio
	instanceVariableNames: 'nombre precio stock laborat'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Remedio guid: (GUID fromString: '{7B5759B2-B8B6-437B-9B2B-4469507079C2}')!
Remedio comment: ''!
!Remedio categoriesForClass!Kernel-Objects! !
!Remedio methodsFor!

iniciar:nom pre:unPre stock:unSt laborat:unLab
"Inicializa el remedio con sus datos"
nombre:=nom.
precio:=unPre.
stock:=unSt.
laborat:=unLab.!

modLab:otroLab
"Modifica el laboratorio del remedio"
laborat:=otroLab.
!

modNombre: otroNom
"Modifica el nombre del remedio"
nombre:=otroNom.!

modPrecio:otroPre
"Modifica el precio del remedio"
precio:=otroPre.
!

modStock:otroSt
"Modifica el stock del remedio"
stock:=otroSt.
!

verLab
"Retorna el laboratorio del remedio"
^laborat!

verNombre
"Retorna el nombre del remedio"
^nombre!

verPrecio 
"Retorna el precio del remedio"
^precio!

verStock
"Retorna el stock del remedio"
^stock! !
!Remedio categoriesFor: #iniciar:pre:stock:laborat:!public! !
!Remedio categoriesFor: #modLab:!accessing!public! !
!Remedio categoriesFor: #modNombre:!accessing!public! !
!Remedio categoriesFor: #modPrecio:!accessing!public! !
!Remedio categoriesFor: #modStock:!accessing!public! !
!Remedio categoriesFor: #verLab!accessing!public! !
!Remedio categoriesFor: #verNombre!public! !
!Remedio categoriesFor: #verPrecio!public! !
!Remedio categoriesFor: #verStock!public! !

!Remedio class methodsFor!

crear:nom con:unPre con:unSt con:unLab
"Crea una instancia de la clase Remedio y la inicializa con sus datos"
^self new iniciar:nom pre:unPre stock:unSt laborat:unLab! !
!Remedio class categoriesFor: #crear:con:con:con:!public! !

