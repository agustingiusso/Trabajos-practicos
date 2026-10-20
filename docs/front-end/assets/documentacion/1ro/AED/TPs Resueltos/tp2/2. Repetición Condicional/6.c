/*
6. Implementar un programa que invierta una cadena de caracteres.
*/

#include <stdio.h>

int main()
{
    char texto[200];
    int i = 0;

    printf("Ingrese una palabra a invertir: ");
    scanf("%s", texto);

    // 1. Repetición Condicional para buscar el final de la palabra
    // Mientras la letra actual NO sea el finalizador '\0'
    while (texto[i] != '\0')
    {
        i = i + 1; // Avanzamos al siguiente casillero
    }

    // Al salir del bucle, 'i' quedó posicionado en el '\0'.
    // Retrocedemos un paso para pararnos en la última letra real.
    i = i - 1;

    printf("La cadena invertida es: ");

    // 2. Repetición Condicional para imprimir hacia atrás
    while (i >= 0)
    {
        printf("%c", texto[i]);
        i = i - 1;
    }

    return 0;
}