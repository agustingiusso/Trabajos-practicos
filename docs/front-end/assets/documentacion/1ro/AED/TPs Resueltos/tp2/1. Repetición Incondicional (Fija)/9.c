/*
9. Escriba la salida de los siguientes bucles Anidados

+---------------------------+---------------------------+---------------------------+
| a)                        | b)                        | c)                        |
+---------------------------+---------------------------+---------------------------+
| Repetir Para i:=1, 5, 1   | Repetir Para i:=3, 1, -1  | Repetir Para i:=1, 3, 1   |
|   Imprimir: i             |   Repetir Para j:=1, i, 1 |   Repetir Para j:=1, 3, 1 |
|   Repetir Para j:=i, 1, -2|     Repetir Para k:=i,j,-1|     Repetir Para k:=i,j, 1|
|     Imprimir: j           |       Imprimir: i, j, k   |       Imprimir: i, j, k   |
|   Fin Repetir Para        |     Fin Repetir Para      |     Fin Repetir Para      |
| Fin Repetir Para          |   Fin Repetir Para        |   Fin Repetir Para        |
|                           | Fin Repetir Para          | Fin Repetir Para          |
+---------------------------+---------------------------+---------------------------+
*/

#include <stdio.h>

int main()
{
    // a)
    printf("a)\n");
    for (int i = 1; i <= 5; i++)
    {
        printf("%d\n", i);
        for (int j = i; j >= 1; j -= 2)
        {
            printf("%d\n", j); // Imprime j desde i hasta 1, decrementando de 2 en 2, quedando en 1 o 2 dependiendo de si i es impar o par
        }
    }

    // b)
    printf("\nb)\n");
    for (int i = 3; i >= 1; i--)
    {
        for (int j = 1; j <= i; j++)
        {
            for (int k = i; k >= j; k--)
            {
                printf("%d, %d, %d\n", i, j, k); // Imprime i, j, k según las condiciones del bucle, quedando k en el rango de i a j
            }
        }
    }

    // c)
    printf("\nc)\n");
    for (int i = 1; i <= 3; i++)
    {
        for (int j = 1; j <= 3; j++)
        {
            for (int k = i; k <= j; k++)
            {
                printf("%d, %d, %d\n", i, j, k); // Imprime i, j, k según las condiciones del bucle, quedando k en el rango de i a j
            }
        }
    }

    return 0;
}