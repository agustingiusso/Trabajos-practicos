/*
7. Implementar un programa que elimine todos los espacios en blanco al comienzo de una cadena de caracteres.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    char letra;
    int inicio_texto = 0;

    // Solicitamos al usuario que ingrese una frase
    printf("Ingrese una frase con espacios al principio: ");

    // Leemos el primer carácter
    scanf("%c", &letra);

    // Repetición Condicional: iteramos mientras no se presione "Enter"
    while (letra != '\n')
    {

        // Si encontramos algo que NO es un espacio, cambiamos la bandera a 1
        if (letra != ' ')
        {
            inicio_texto = 1;
        }

        // Si ya pasamos los espacios iniciales, imprimimos todo lo que llegue
        // (incluyendo los espacios que estén en el medio o al final de la frase)
        if (inicio_texto == 1)
        {
            printf("%c", letra);
        }

        // Leemos el siguiente carácter para la próxima vuelta del bucle
        scanf("%c", &letra);
    }

    printf("\n");
    return 0;
}