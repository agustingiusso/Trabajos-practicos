"Filed out from Dolphin Smalltalk 7"!

Object subclass: #Farmacia
	instanceVariableNames: 'nombre conjRem'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Farmacia guid: (GUID fromString: '{5581E204-7EF5-4602-94C7-C8846679A54E}')!
Farmacia comment: ''!
!Farmacia categoriesForClass!Kernel-Objects! !
!Farmacia methodsFor!

agregar:unRem
conjRem add:unRem.!

eliminar:unRem
conjRem remove: unRem ifAbsent:[^nil].!

esVacio
^conjRem isEmpty.!

existe: unRem
^conjRem includes: unRem.!

init: nom

nombre:= nom.
conjRem := OrderedCollection new.!

modNombre:otroNom

nombre:=otroNom.!

recuperar: i
^conjRem at: i.!

tamanio
^conjRem size.!

verNombre
^nombre!

verTodos
^conjRem.! !
!Farmacia categoriesFor: #agregar:!public! !
!Farmacia categoriesFor: #eliminar:!public! !
!Farmacia categoriesFor: #esVacio!public! !
!Farmacia categoriesFor: #existe:!public! !
!Farmacia categoriesFor: #init:!public! !
!Farmacia categoriesFor: #modNombre:!public! !
!Farmacia categoriesFor: #recuperar:!public! !
!Farmacia categoriesFor: #tamanio!public! !
!Farmacia categoriesFor: #verNombre!public! !
!Farmacia categoriesFor: #verTodos!public! !

!Farmacia class methodsFor!

crear:nom

^self new init:nom.
! !
!Farmacia class categoriesFor: #crear:!public! !

