/*
8. ¿Qué valores van tomando las variables en este conjunto de instrucciones?
A := 3625,25 B := 0,2568
OP := (A + B) / 152
Imprimir: OP
OP := (OP * A) – B
Imprimir: OP
B := OP * 56
Imprimir: B
Si OP >= 45 Entonces
Imprimir: ‘ Camino 1’ , A , B
Sino Imprimir: ‘ Camino 2’ , A , OP
Fin Si
Imprimir: A, B, OP**3
*/

#include <stdio.h>

int main()
{
    float A = 3625.25, B = 0.2568;
    float OP;

    OP = (A + B) / 152;
    printf("OP: %f\n", OP);
    // OP = (3625.25 + 0.2568) / 152 = 23.8520

    OP = (OP * A) - B;
    printf("OP: %f\n", OP);
    // OP = (23.8520 * 3625.25) - 0.2568 = 86469.27

    B = OP * 56;
    printf("B: %f\n", B);
    // B = 86469.27 * 56 = 4842279.50

    if (OP >= 45)
    {
        printf("Camino 1: A: %f, B: %f\n", A, B);
        // Camino 1: A: 3625.250000, B: 4842279.500000
    }
    else
    {
        printf("Camino 2: A: %f, OP: %f\n", A, OP);
        // Al ser OP >= 45 nunca se ejecutará este camino
    }

    printf("A: %f, B: %f, OP^3: %f\n", A, B, OP * OP * OP);
    // A: 3625.250000, B: 4842279.500000, OP^3: 646540306169856.000000

    return 0;
}