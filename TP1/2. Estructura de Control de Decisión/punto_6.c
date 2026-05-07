/*
6. Realizar un programa que simule una calculadora simple. Lee dos números y un carácter.
Si el carácter es un "+", se imprime la suma; si es un "-", se imprime la diferencia;
si es un "*", se imprime el producto;
si es un "/", se imprime el cociente (si no puede calcularse debe emitirse un aviso).
Utilizar el CASO.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    float num1, num2, resultado;
    char operacion;

    // 1. Ingreso de datos
    printf("--- Calculadora Simple ---\n");

    printf("Ingrese el primer numero: ");
    scanf("%f", &num1);

    printf("Ingrese el operador (+, -, *, /): ");
    // El espacio inicial en " %c" es crucial para limpiar el buffer del teclado
    scanf(" %c", &operacion);

    printf("Ingrese el segundo numero: ");
    scanf("%f", &num2);

    printf("\n========================================\n");

    // 2. Evaluacion utilizando la estructura CASO (switch en C)
    switch (operacion)
    {
    case '+':
        resultado = num1 + num2;
        printf("Resultado de la suma: %.2f\n", resultado);
        break;

    case '-':
        resultado = num1 - num2;
        printf("Resultado de la diferencia: %.2f\n", resultado);
        break;

    case '*':
        resultado = num1 * num2;
        printf("Resultado del producto: %.2f\n", resultado);
        break;

    case '/':
        // Evaluamos que el divisor no sea cero antes de calcular
        if (num2 != 0)
        {
            resultado = num1 / num2;
            printf("Resultado del cociente: %.2f\n", resultado);
        }
        else
        {
            printf("AVISO: No es posible calcular el cociente (division por cero).\n");
        }
        break;

    default:
        // Caso por defecto si el usuario ingresa un caracter no valido
        printf("ERROR: El operador ingresado ('%c') no es valido.\n", operacion);
        break;
    }

    printf("========================================\n");

    return 0;
}