#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define clearscr() printf("\033[2J"); printf("\033[H")

unsigned long long fact(int x){
    unsigned long long result = 1;
    for(int i = 1; i <= x; i++){
        result = result * i;
    }
    //printf(" | Factorial of %d is %llu |\n", x, result);
    return result;
}


double sine(double x, int acc){
    const double PI = 3.14159265359;
    double sine = (x * PI)/180;
    sine = fmod(sine, (2 * PI));

    if(sine < 0){
        sine = 2 * PI - sine;
    }

    signed int sign = 1;
    if(sine < PI){
        sine -= PI;
        sign = -1;
    }

    double sineResult = sine;

    //printf("\n %f", sineResult);
    for(int i = 1; i <= acc; i++){
        int t = i+(i+1);
        if(i % 2 != 0){
            sineResult = sineResult - ( (double) pow(sine, t)  / fact(t) )  ;
            //printf("\n %lf Sub %d", sineResult, t);
        }else{
            sineResult = sineResult + ( (double) pow(sine, t)  / fact(t) ) ;
            //printf("\n %lf Add %d", sineResult, t);
        }
    }
    return (float) sign * sineResult;
}

double sineInRange(int from, int to){
    for(int i = from; i <= to; i++){
        double x = sine(i, 12);
        printf("| %i has a sine of %f |\n", i, x);
    }
}




int main(){

    char opt[100];
    clearscr();
    printf("Do you want a specific sine or the sines of all the numbers in a certain range? (range is integers only)\n\n1. Number\n2. Range\n");
    fflush(stdout);
    fflush(stdin);
    fgets(opt, 2, stdin);

    if(strcmp(opt, "1") == 0){
        clearscr();
        printf("Please input the integer you want to calculate the sine of: ");
        fflush(stdin);
        fgets(opt, 100, stdin);
        clearscr();
        int val = atoi(opt);
        double result = sine(val, 14);
        printf("The result for %d is: %f", val, result);
    }

    else if(strcmp(opt, "2") == 0){
        int range_1, range_2;
        clearscr();
        printf("? to ?\n");
        printf("Please input the first integer of the range: ");
        fflush(stdin);
        fgets(opt, 100, stdin);
        range_1 = atoi(opt);
        clearscr();
        printf("%i to ?\n", range_1);
        printf("Please input the second integer of the range: ");
        fflush(stdin);
        fgets(opt, 100, stdin);
        range_2 = atoi(opt);
        clearscr();
        printf("The sines of the range %i to %i are:\n", range_1, range_2);
        sineInRange(range_1, range_2);
    }

    else{
        
        printf("Please select a valid option.\n");
    }

    return 0;
}