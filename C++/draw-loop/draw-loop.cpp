#include <ncurses.h>
#include <random>
#include <unistd.h>

class Point {
    public:
        int x;
        int y;
        Point(int x, int y){
            this->x = x;
            this->y = y;
        }
        Point(){
            this->x = 0;
            this->x = 0;
        }
};

const int width = 50;
const int height = 20;
const int point_ammount = 20;

Point points[point_ammount];

bool quit = false;

int Constrain(int val, int min, int max){
    int value = val;
    if(value > max){
        value = max;
    }else if(value < min){
        value = min;
    }
    return value;
}

bool CheckArray(Point pts[], int x, int y){
    for(int i = 0; i < point_ammount; i++){
        if(pts[i].x == x && pts[i].y == y){
            return true;
        }
    }
    return false;
}

void Setup(){
    srand(1234081234);
    initscr();
    nodelay(stdscr, true);
}

void Draw(){
    clear();
    for(int i = 0; i <= width; i++){
        printw("#");
    }
    printw("\n");
    for(int i = 0; i < height; i++){
        for(int j = 0; j <= width; j++){
            if(j == 0 || j == width){
                printw("#");
            }
            else if(CheckArray(points, j, i)){
                printw("O");
            }
            else{
                printw(" ");
            }
            
        }
        printw("\n");
    }
    for(int i = 0; i <= width; i++){
        printw("#");
    }
    
    refresh();
}

void Math(){

}

void Input(){
    if(getch() != ERR){
        quit = true;
    }
}

int main(){
    Setup();
    while(!quit){
        Input();
        Math();
        Draw();
        usleep(33333);
    }
    endwin();
}