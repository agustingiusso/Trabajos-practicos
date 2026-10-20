/*
6. ¿Qué errores de sintaxis se detectan en los siguientes grupos de sentencias?
a)
Si (A > 0) Entonces
    Si (B > 0) Entonces
        C:= A + B
Sino
    C:= A + 3 * C
    D:= A - B – C

b)
Si (A > 0)
    Imprimir: ‘Es Mayor...’
Sino
    Imprimir: ‘Es menor...’
Si
    Imprimir: ‘Son Iguales...’
Fin Si

Analizar y mostrar todos los posibles códigos resultantes de intentar corregir el / los error(es) encontrado(s).
*/

#include <stdio.h>

int main()
{
    // Análisis del caso a)(Hecho con IA):
    printf("Los errores de sintaxis en el grupo de sentencias a) son:\n");
    printf("1. Falta cerrar los bloques: todo \"Si\" debe terminar obligatoriamente con un \"Fin Si\".\n");
    printf("2. Ambiguedad del \"Sino\": no queda claro a cual de los dos \"Si\" pertenece, lo que cambia toda la logica.\n\n");

    printf("--- Posibles codigos resultantes (Caso a) ---\n\n");

    printf("Opcion 1: El \"Sino\" pertenece al PRIMER \"Si\" (A > 0)\n");
    printf("Si (A > 0) Entonces\n");
    printf("    Si (B > 0) Entonces\n");
    printf("        C:= A + B\n");
    printf("    Fin Si\n");
    printf("Sino\n");
    printf("    C:= A + 3 * C\n");
    printf("    D:= A - B - C\n");
    printf("Fin Si\n\n");

    printf("Opcion 2: El \"Sino\" pertenece al SEGUNDO \"Si\" (B > 0)\n");
    printf("Si (A > 0) Entonces\n");
    printf("    Si (B > 0) Entonces\n");
    printf("        C:= A + B\n");
    printf("    Sino\n");
    printf("        C:= A + 3 * C\n");
    printf("        D:= A - B - C\n");
    printf("    Fin Si\n");
    printf("Fin Si\n\n");

    printf("========================================================\n\n");

    // Análisis del caso b)(Hecho con IA):
    printf("Los errores de sintaxis en el grupo de sentencias b) son:\n");
    printf("1. Falta la palabra reservada \"Entonces\" en la primera linea.\n");
    printf("2. Hay un \"Si\" suelto sin condicion a evaluar ni la palabra \"Entonces\" antes de 'Son Iguales...'.\n\n");

    printf("--- Posibles codigos resultantes (Caso b) ---\n\n");

    printf("Opcion 1: Estructura anidada completa y correcta\n");
    printf("Si (A > 0) Entonces\n");
    printf("    Imprimir: 'Es Mayor...'\n");
    printf("Sino\n");
    printf("    Si (A < 0) Entonces\n");
    printf("        Imprimir: 'Es menor...'\n");
    printf("    Sino\n");
    printf("        Imprimir: 'Son Iguales...'\n");
    printf("    Fin Si\n");
    printf("Fin Si\n\n");

    printf("Opcion 2: Resolviendo con condiciones separadas (Sin usar Sino)\n");
    printf("Si (A > 0) Entonces\n");
    printf("    Imprimir: 'Es Mayor...'\n");
    printf("Fin Si\n");
    printf("Si (A < 0) Entonces\n");
    printf("    Imprimir: 'Es menor...'\n");
    printf("Fin Si\n");
    printf("Si (A = 0) Entonces\n");
    printf("    Imprimir: 'Son Iguales...'\n");
    printf("Fin Si\n\n");

    return 0;
}