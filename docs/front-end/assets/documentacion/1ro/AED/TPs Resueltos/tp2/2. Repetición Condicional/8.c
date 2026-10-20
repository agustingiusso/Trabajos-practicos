/*
8. Implementar un programa que elimine todos los espacios en blanco al final de una cadena
de caracteres.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    char letra;
    int espacios_pendientes = 0;

    printf("Ingrese una frase con espacios al final: ");

    // Leemos el primer carácter
    scanf("%c", &letra);

    // Repetición Condicional: iteramos mientras no se presione "Enter"
    while (letra != '\n')
    {

        if (letra == ' ')
        {
            // Si es un espacio, NO lo imprimimos. Solo sumamos uno al contador.
            espacios_pendientes = espacios_pendientes + 1;
        }
        else
        {
            // Si encontramos una letra, imprimimos primero todos los espacios
            // que habían quedado en espera (porque estaban en el medio del texto)
            while (espacios_pendientes > 0)
            {
                printf(" ");
                espacios_pendientes = espacios_pendientes - 1;
            }

            // Y luego imprimimos la letra real
            printf("%c", letra);
        }

        // Leemos el siguiente carácter para la próxima vuelta del bucle
        scanf("%c", &letra);
    }

    // Cuando se presiona Enter, el programa termina.
    // Si habían quedado espacios en el contador, nunca se imprimen,
    // logrando así eliminarlos del final.

    return 0;
}