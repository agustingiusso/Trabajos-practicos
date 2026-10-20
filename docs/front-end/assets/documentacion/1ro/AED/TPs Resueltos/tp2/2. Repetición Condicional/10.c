/*
10. Se tienen 2 variables de tipo carácter de 200 y se leen de a un carácter por el teclado. Se
quiere saber si son iguales, sabiendo que los blancos no se toman en cuenta, salvo que estén
entre dos caracteres no blancos en cuyo caso se cuentan como uno solo. Además, se quiere
determinar si en alguna de las variables las dos primeras posiciones son ‘AB’ y si las últimas
posiciones son ‘ON’. Puede suceder que no sean de la misma longitud. Imprima un mensaje.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    char var1[200];
    char var2[200];
    char letra;

    int i;
    int ultimo_espacio;
    int len1, len2;
    int son_iguales;

    // --- LECTURA DE LA VARIABLE 1 ---
    printf("Ingrese la primera frase: ");
    i = 0;
    ultimo_espacio = 1; // Arranca en 1 para ignorar los espacios del principio

    scanf("%c", &letra);

    // Repetimos mientras no se presione Enter
    while (letra != '\n')
    {
        if (letra != ' ')
        {
            var1[i] = letra;
            i = i + 1;
            ultimo_espacio = 0;
        }
        else
        {
            if (ultimo_espacio == 0)
            {
                var1[i] = ' ';
                i = i + 1;
                ultimo_espacio = 1;
            }
        }
        scanf("%c", &letra);
    }

    // Si el último guardado fue un espacio, lo borramos retrocediendo el índice
    if (i > 0 && var1[i - 1] == ' ')
    {
        i = i - 1;
    }
    var1[i] = '\0';
    len1 = i; // Aprovechamos para guardar la longitud total de var1

    // --- LECTURA DE LA VARIABLE 2 ---
    // Repetimos exactamente la misma lógica para el segundo texto
    printf("Ingrese la segunda frase: ");
    i = 0;
    ultimo_espacio = 1;

    scanf("%c", &letra);

    while (letra != '\n')
    {
        if (letra != ' ')
        {
            var2[i] = letra;
            i = i + 1;
            ultimo_espacio = 0;
        }
        else
        {
            if (ultimo_espacio == 0)
            {
                var2[i] = ' ';
                i = i + 1;
                ultimo_espacio = 1;
            }
        }
        scanf("%c", &letra);
    }

    if (i > 0 && var2[i - 1] == ' ')
    {
        i = i - 1;
    }
    var2[i] = '\0';
    len2 = i; // Aprovechamos para guardar la longitud total de var2

    // --- 1. VERIFICAR SI SON IGUALES ---
    i = 0;
    son_iguales = 1; // Suponemos que son iguales (1) hasta demostrar lo contrario

    // Comparamos mientras no termine alguna cadena y sigan siendo iguales
    while ((var1[i] != '\0' || var2[i] != '\0') && son_iguales == 1)
    {
        if (var1[i] != var2[i])
        {
            son_iguales = 0; // Encontramos una diferencia
        }
        i = i + 1;
    }

    // --- IMPRESIÓN DE RESULTADOS ---
    printf("\n--- Resultados ---\n");

    // 1. Igualdad
    if (son_iguales == 1)
    {
        printf("1. Las frases SON iguales (los blancos multiples se contaron como uno solo).\n");
    }
    else
    {
        printf("1. Las frases NO son iguales.\n");
    }

    // 2. Verificar 'AB' en las dos primeras posiciones
    // Usamos len1 y len2 >= 2 para evitar errores si ingresaste menos de 2 letras
    if ((len1 >= 2 && var1[0] == 'A' && var1[1] == 'B') ||
        (len2 >= 2 && var2[0] == 'A' && var2[1] == 'B'))
    {
        printf("2. Al menos una de las variables empieza con 'AB'.\n");
    }
    else
    {
        printf("2. Ninguna variable empieza con 'AB'.\n");
    }

    // 3. Verificar 'ON' en las dos ultimas posiciones
    if ((len1 >= 2 && var1[len1 - 2] == 'O' && var1[len1 - 1] == 'N') ||
        (len2 >= 2 && var2[len2 - 2] == 'O' && var2[len2 - 1] == 'N'))
    {
        printf("3. Al menos una de las variables termina con 'ON'.\n");
    }
    else
    {
        printf("3. Ninguna variable termina con 'ON'.\n");
    }

    return 0;
}