

class Cell
{
    constructor(i, j, scl)
    {
        this.i = i;
        this.j = j;
        this.scl = scl;
        this.x = i * scl;
        this.y = j * scl;
        this.visited = false;
        this.neighbors = [];
        this.walls = [true, true, true, true]; // Top, Right, Bottom, Left
    }

    show(c)
    {
        strokeWeight(1);
        if (c)
            stroke(c);
        else
            stroke(255);
        noFill();
        if (this.walls[0])
            line(this.x, this.y, this.x + this.scl, this.y);
        if (this.walls[1])
            line(this.x + this.scl, this.y, this.x + this.scl, this.y + this.scl);
        if (this.walls[2])
            line(this.x + this.scl, this.y + this.scl, this.x, this.y + this.scl);
        if (this.walls[3])
            line(this.x, this.y + this.scl, this.x, this.y);
    }
}