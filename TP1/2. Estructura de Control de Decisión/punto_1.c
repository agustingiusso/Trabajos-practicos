/*
Programa En Pseudocódigo:
Programa Pares
// Programa escrito por: Gustavo
// Fecha: 26 de Abril de 2009
// Versión: 05
// Nombre del archivo: Pares
// Este programa suma tres números de a pares y compara con el número restante.
// Se utilizan SI anidados.
Variables
A, B, C: Real 5,2
Hacer // Comienzo del programa
// Ingreso de datos
Imprimir: 'Ingrese el primer valor: '
Leer: A
Imprimir: 'Ingrese el segundo valor: '
Leer: B
Imprimir: 'Ingrese el tercer valor: '
Leer: C
// Se aplican SI anidados para comparar SI
(A+B)=C ENTONCES
Imprimir: ‘ Son Iguales....! ‘
SINO
SI (A+C)=B ENTONCES
Imprimir: ‘ Son Iguales....! ‘
SINO
SI (B+C)=A ENTONCES
Imprimir: ‘ Son Iguales....! ‘
SINO
Imprimir: ‘ Son Distintos...! ‘
FIN SI
FIN SI
FIN SI
Fin Hacer
Fin Programa Pares

1. Si se analiza el pseudocódigo del ejemplo,
se destaca que cada una de las condiciones llevaban a hacer exactamente lo mismo en caso de que cualquiera de ellas fuese verdadera,
y sólo se hacía algo diferente en el caso en que TODAS ellas resultaban falsas.
Encontrar una manera de construir una condición que permita expresar lo que acabamos de mencionar,
de modo que el programa resultante utilice una sola sentencia Sl para decidir.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    float a, b, c;

    // 1. Ingreso de datos
    printf("--- Analizador de sumas de pares ---\n");
    printf("Ingrese el primer valor: ");
    scanf("%f", &a);

    printf("Ingrese el segundo valor: ");
    scanf("%f", &b);

    printf("Ingrese el tercer valor: ");
    scanf("%f", &c);

    // 2. Evaluación con una sola sentencia de decisión
    // Operador lógico OR (||) para unificar las condiciones
    if ((a + b == c) || (a + c == b) || (b + c == a))
    {
        printf("Son Iguales....!\n");
    }
    else
    {
        printf("Son Distintos...!\n");
    }

    return 0;
}