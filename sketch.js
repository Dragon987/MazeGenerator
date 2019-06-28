let grid;
let current;
let rows, cols, scl;
let stack = [];

function setup()
{
    createCanvas(900, 900);
    scl = 30;
    rows = floor(width / scl), cols = floor(height / scl);

    grid = [];
    for (let j = 0; j < rows; j++)
    {
        let col = [];
        for (let i = 0; i < cols; i++)
        {
            let c = new Cell(i, j, scl)
            col.push(c);
        }
        grid.push(col);
    }

    for (let j = 0; j < rows; j++)
    {
        for (let i = 0; i < cols; i++)
        {
            if (j > 0)
                grid[j][i].neighbors.push(grid[j - 1][i]); // Top
            if (i < cols - 1)
                    grid[j][i].neighbors.push(grid[j][i + 1]); // Right
            if (j < rows - 1)
                grid[j][i].neighbors.push(grid[j + 1][i]); // Bottom
            if (i > 0)
                grid[j][i].neighbors.push(grid[j][i - 1]); // Left
        }
    }
    current = grid[0][0];
    current.visited = true;
    stack.push(current);
}

function draw()
{
    background(0);
    for (let col of grid)
        for (let c of col)
        {
            if (c.visited)
                c.show(color(0, 255, 0));
            else
            c.show(color(255));
        }
    current.show(color(255, 0, 0));

    let n = 0;
    let unvisited = [];
    for (let neighbor of current.neighbors)
        if (!neighbor.visited)
        {
            unvisited.push(neighbor);
            n++;
        }

    if (n > 0)
    {
        let choice = random(unvisited);
        choice.visited = true;

        stack.push(current);

        if (choice.i > current.i)
        {
            current.walls[1] = false;
            choice.walls[3] = false;
        }

        else if (choice.i < current.i)
        {
            current.walls[3] = false;
            choice.walls[1] = false;
        }

        else
        {
            if (choice.j > current.j)
            {
                current.walls[2] = false;
                choice.walls[0] = false;
            }

            else if (choice.j > current.j)
            {
                current.walls[0] = false;
                choice.walls[2] = false;
            }
        }
        current = choice;

    } 
    else if (stack.length > 0)
    {
        current = stack.pop();
    }
    else if (stack.length === 0)
    {
        noLoop();
    }
}